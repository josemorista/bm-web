import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { Header } from '../../../components/Header';
import { ROUTES } from '../../../consts';
import { IExam } from '../../../domain/modules/exams/entities/IExam';
import { CreateExamsServicesFactory } from '../../../domain/modules/exams/factories/CreateExamsServicesFactory';
import { withAuth } from '../../../hocs';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { ExamStyles } from './_[examId]_styles';

type IVisualizationOptions = 'ore' | 'oro' | 'oeo';

const processExamService = CreateExamsServicesFactory.createProcessExamService();
const getExamByIdService = CreateExamsServicesFactory.createGetExamByIdService();

const invertPixelData = function (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	for (let i = 0; i < data.length; i += 4) {
		data[i] = 255 - data[i];     // red
		data[i + 1] = 255 - data[i + 1]; // green
		data[i + 2] = 255 - data[i + 2]; // blue
	}
	ctx.putImageData(imageData, 0, 0);
};

function Exam() {

	const { token } = useAuthentication();

	const router = useRouter();
	const { examId } = router.query;
	const debounce = useRef<null | NodeJS.Timeout>(null);
	const [exam, setExam] = useState<IExam | null | undefined>(undefined);

	const [visualization, setVisualization] = useState<IVisualizationOptions>('ore');
	const [pixelDataColorScheme, setPixelDataColorScheme] = useState<'bInW' | 'wInB'>('bInW');

	const canvas1Ref = useRef<HTMLCanvasElement>(null);
	const canvas2Ref = useRef<HTMLCanvasElement>(null);
	const canvas3Ref = useRef<HTMLCanvasElement>(null);

	const togglePixelDataColorScheme = () => {
		const canvasArray = [canvas1Ref, canvas2Ref, canvas3Ref];
		canvasArray.forEach((canvasRef) => {
			if (canvasRef.current) {
				const ctx = canvasRef.current.getContext('2d');
				if (ctx) {
					invertPixelData(ctx, canvasRef.current);
				}
			}
		});
	};

	const refreshImages = useCallback((exam: IExam, visualization?: IVisualizationOptions) => {

		const imgs = [new Image(), new Image(), new Image()];

		imgs.forEach(img => {
			img.setAttribute('crossOrigin', '');
		});

		const canvasArray = [canvas1Ref, canvas2Ref, canvas3Ref];

		exam.originalImageUrl && (imgs[0].src = exam.originalImageUrl);

		exam.resultImageUrl && (imgs[1].src = exam.resultImageUrl);
		exam.edgedResultImageUrl && (imgs[2].src = exam.edgedResultImageUrl);

		if (['oro', 'oeo'].includes(visualization || 'ore')) {
			exam.overlayImageUrl && (imgs[2].src = exam.overlayImageUrl);
		}

		if (visualization === 'oeo') {
			exam.edgedResultImageUrl && (imgs[1].src = exam.edgedResultImageUrl);
		}

		canvasArray.forEach((canvasRef, i) => {
			if (canvasRef.current) {
				const ctx = canvasRef.current.getContext('2d');
				ctx?.clearRect(0, 0, 256, 1024);
				imgs[i].onload = function () {
					ctx?.drawImage(imgs[i], 0, 0);
				};

			}
		});

		console.log('painted');

	}, []);

	const handleProcessExam = useCallback(async (exam: IExam, threshold: number): Promise<void> => {
		try {
			if (exam) {
				await processExamService.execute({
					examId: String(exam.id),
					threshold,
					authorizeToken: token
				});
				refreshImages(exam, visualization);
			}
		} catch (error) {
			console.error(error);
		}
	}, [refreshImages, token, visualization]);

	const getExam = useCallback(async () => {
		if (examId) {
			const resp = await getExamByIdService.execute({
				examId: String(examId),
				authorizeToken: token
			});
			if (resp) {
				if (!resp.originalImageUrl) {
					await handleProcessExam(resp, 0.4);
				} else {
					refreshImages(resp);
				}
				setExam(resp);
			} else {
				Router.replace(ROUTES.MY_PATIENTS);
			}
		}
	}, [token, examId, handleProcessExam, refreshImages]);

	useEffect(() => {
		if (exam === undefined) {
			getExam();
		}
	}, [exam, getExam]);


	return <ExamStyles.Container>
		<Head>
			<title>Exam | Bone Metastasis</title>
		</Head>
		<Header />
		<main>
			<header>
				<h1>
					Exam: Posterior01
				</h1>
				<Button variant="secondary" onClick={() => {
					Router.back();
				}}>
					Back
				</Button>
			</header>
			<h2>
				Segmentation & Classification
			</h2>
			<section className="segmentationAndClassification">
				<ul>
					<li>
						<canvas width="256px" height="1024px" ref={canvas1Ref}></canvas>
					</li>
					<li>
						<canvas width="256px" height="1024px" ref={canvas2Ref}></canvas>
					</li>
					<li>
						<canvas width="256px" height="1024px" ref={canvas3Ref}></canvas>
					</li>
				</ul>

				<section className="segmentationOptions">
					<section className="threshold">
						<h6>Classifier probability threshold</h6>
						<legend>
							Lower probability allows more detections but with less precision
						</legend>
						<input onChange={e => {
							if (debounce.current) {
								clearTimeout(debounce.current);
							}
							debounce.current = setTimeout(() => {
								exam && handleProcessExam(exam, Number(e.target.value));
							}, 1000);
						}} type="range" defaultValue="0.4" min="0" max="1" step="0.1" />
					</section>
					<section className="contrast">
						<h6>Visualization contrast</h6>
						<div>
							<span className={`whiteContrast ${pixelDataColorScheme === 'wInB' ? 'selected' : ''}`} onClick={() => {
								if (pixelDataColorScheme === 'bInW') {
									setPixelDataColorScheme('wInB');
									togglePixelDataColorScheme();
								}
							}}></span>
							<span className={`blackContrast ${pixelDataColorScheme === 'bInW' ? 'selected' : ''}`} onClick={() => {
								if (pixelDataColorScheme === 'wInB') {
									setPixelDataColorScheme('bInW');
									togglePixelDataColorScheme();
								}
							}}></span>
						</div>
					</section>
					<section>
						<h6>Visualizations:</h6>
						<ul>
							<li>
								<Checkbox checked={visualization === 'oro'} onChange={() => {
									setVisualization('oro');
									exam && (refreshImages(exam, 'oro'));
								}} label="Original + segmented + overlay" />
								<Checkbox checked={visualization === 'ore'} onChange={() => {
									setVisualization('ore');
									exam && (refreshImages(exam, 'ore'));
								}} label="Original + segmented + edged" />
								<Checkbox checked={visualization === 'oeo'} onChange={() => {
									setVisualization('oeo');
									exam && (refreshImages(exam, 'oeo'));
								}} label="Original + edged + overlay" />
							</li>
						</ul>
					</section>
				</section>
			</section>
			<h2>
				Report
			</h2>
			<section className="report">
				<p>Detections count: -</p>
				<p>Total affected area: - mm²</p>
			</section>
		</main>
	</ExamStyles.Container >;
}

export default withAuth(Exam, { strictPrivate: true });