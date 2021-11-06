import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Button } from "../../../components/templates/Button";
import { Checkbox } from "../../../components/templates/Checkbox";
import { Header } from "../../../components/Header";
import { ROUTES } from "../../../consts";
import { IExam } from "../../../domain/modules/exams/entities/IExam";
import { ISegmentedExam } from "../../../domain/modules/exams/entities/ISegmentedExam";
import { CreateExamsServicesFactory } from "../../../domain/modules/exams/factories/CreateExamsServicesFactory";
import { withAuth } from "../../../hocs";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { ExamStyles } from "../../../styles/pages/patients/exams/examId";

type IVisualizationOptions = "ore" | "oro" | "oeo";

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

	const reportRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState<boolean | undefined>(true);

	const debounce = useRef<null | NodeJS.Timeout>(null);

	const [segmentedExam, setSegmentedExam] = useState<ISegmentedExam | undefined>(undefined);

	const { data: exam, refetch: refetchExam } = useQuery<IExam | null>(`exam-:${examId}`, async () => {
		const exam = await getExamByIdService.execute({
			authorizeToken: token,
			examId: String(examId)
		});
		return exam;
	}, {
		onSuccess: async (data) => {
			if (!data) {
				Router.replace(ROUTES.MY_PATIENTS);
				return;
			}
			if (data && !data?.originalImageUrl) {
				try {
					await handleProcessExam(data, 0.4);
				} catch (error) {
					console.error(error);
				}
			} else {
				if (data.segmentedExam) {
					setSegmentedExam(data.segmentedExam);
				}
				setLoading(false);
			}
			refreshImages(data, visualization);
		}
	});

	const [visualization, setVisualization] = useState<IVisualizationOptions>("oeo");
	const [pixelDataColorScheme, setPixelDataColorScheme] = useState<"bInW" | "wInB">("bInW");

	const canvas1Ref = useRef<HTMLCanvasElement>(null);
	const canvas2Ref = useRef<HTMLCanvasElement>(null);
	const canvas3Ref = useRef<HTMLCanvasElement>(null);

	const togglePixelDataColorScheme = () => {
		const canvasArray = [canvas1Ref, canvas2Ref, canvas3Ref];
		canvasArray.forEach((canvasRef) => {
			if (canvasRef.current) {
				const ctx = canvasRef.current.getContext("2d");
				if (ctx) {
					invertPixelData(ctx, canvasRef.current);
				}
			}
		});
	};

	const refreshImages = useCallback((exam: IExam, visualization?: IVisualizationOptions) => {

		const imgs = [new Image(), new Image(), new Image()];

		const ts = Date.now();

		imgs.forEach(img => {
			img.setAttribute("crossOrigin", "");
		});

		const canvasArray = [canvas1Ref, canvas2Ref, canvas3Ref];

		exam.originalImageUrl && (imgs[0].src = `${exam.originalImageUrl}?ts=${ts}`);

		exam.resultImageUrl && (imgs[1].src = `${exam.resultImageUrl}?ts=${ts}`);
		exam.edgedResultImageUrl && (imgs[2].src = `${exam.edgedResultImageUrl}?ts=${ts}`);

		if (["oro", "oeo"].includes(visualization || "ose")) {
			exam.overlayImageUrl && (imgs[2].src = `${exam.overlayImageUrl}?ts=${ts}`);
		}

		if (visualization === "oeo") {
			exam.edgedResultImageUrl && (imgs[1].src = `${exam.edgedResultImageUrl}?ts=${ts}`);
		}

		canvasArray.forEach((canvasRef, i) => {
			if (canvasRef.current) {
				const ctx = canvasRef.current.getContext("2d");
				ctx?.clearRect(0, 0, 256, 1024);
				imgs[i].onload = function () {
					ctx?.drawImage(imgs[i], 0, 0);
				};
			}
		});
	}, []);

	const handleProcessExam = useCallback(async (exam: IExam, threshold: number): Promise<void> => {
		setLoading(true);
		try {
			if (exam) {
				const response = await processExamService.execute({
					examId: String(exam.id),
					threshold,
					authorizeToken: token
				});
				setSegmentedExam(response);
				if (!exam.originalImageUrl) {
					await refetchExam();
				} else {
					refreshImages(exam, visualization);
				}
			}
		} catch (error) {
			console.error(error);
		}
		setLoading(false);
	}, [refreshImages, token, visualization, refetchExam]);

	const handleChangeVisualization = (op: IVisualizationOptions) => {
		setVisualization(op);
		setPixelDataColorScheme("bInW");
		exam && (refreshImages(exam, op));
	};

	const downloadInnerHtml = (filename: string, mimeType?: string) => {
		const elHtml = reportRef.current?.innerHTML.replace(/(<\/p>)|(<br\/>)|(<\/h[12]>)/g, "\n").replace(/<\/?(.+?)>/g, "");
		if (elHtml) {
			const link = document.createElement("a");
			mimeType = mimeType || "text/plain";

			link.setAttribute("download", filename);
			link.setAttribute("href", "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(elHtml));
			link.click();
		}
	};

	const affectedAreaRatio = ((segmentedExam?.affectedArea || 0) / (segmentedExam?.classifiedArea || 1));

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
				<Button ariaLabel="Go back button" variant="secondary" onClick={() => {
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

				{!loading ? <section className="segmentationOptions">
					<section className="threshold">
						<h6>Classifier probability threshold</h6>
						<legend>
							Lower probability allows more detections but with less precision
						</legend>
						<div className="inputRangeContainer">
							<span>0</span>
							<input onChange={e => {
								if (debounce.current) {
									clearTimeout(debounce.current);
								}
								debounce.current = setTimeout(() => {
									exam && handleProcessExam(exam, Number(e.target.value));
								}, 1000);
							}} type="range" defaultValue={segmentedExam?.threshold || 0.4} list="threshold-tickmarks" min="0" max="1" step="0.1" />
							<datalist id="threshold-tickmarks">
								{[...new Array(11)].map((el, i) => <option key={i * 0.1} value={i * 0.1} label={`${i * 0.1}`} />)}
							</datalist>
							<span>1</span>
						</div>
					</section>
					<section className="contrast">
						<h6>Visualization contrast</h6>
						<div>
							<span className={`whiteContrast ${pixelDataColorScheme === "wInB" ? "selected" : ""}`} onClick={() => {
								if (pixelDataColorScheme === "bInW") {
									setPixelDataColorScheme("wInB");
									togglePixelDataColorScheme();
								}
							}}></span>
							<span className={`blackContrast ${pixelDataColorScheme === "bInW" ? "selected" : ""}`} onClick={() => {
								if (pixelDataColorScheme === "wInB") {
									setPixelDataColorScheme("bInW");
									togglePixelDataColorScheme();
								}
							}}></span>
						</div>
					</section>
					<section>
						<h6>Visualizations:</h6>
						<ul>
							<li>
								<Checkbox checked={visualization === "oro"} onChange={() => {
									handleChangeVisualization("oro");
								}} label="Original + segmented + overlay" />
								<Checkbox checked={visualization === "ore"} onChange={() => {
									handleChangeVisualization("ore");
								}} label="Original + segmented + edged" />
								<Checkbox checked={visualization === "oeo"} onChange={() => {
									handleChangeVisualization("oeo");
								}} label="Original + edged + overlay" />
							</li>
						</ul>
					</section>
				</section> : <div className="loading"><img src="/assets/imgs/gif/loading.gif" alt="loading" />Loading...</div>}
			</section>
			<h2>
				Report
			</h2>
			<section className={`report ${(segmentedExam?.affectedArea ?? 0) > 0 ? "negative" : ""}`} ref={reportRef}>
				<h1>{exam?.patient?.name} - {exam?.patient?.dicomPatientId}</h1>
				<h2 hidden>RESULTS:</h2>
				<p hidden>Whole-body images in the anterior and posterior projections obtained 3 hours after intravenous administration of the radiotracer
					show focal areas of increased radiotracer fixation:</p>
				<p hidden>Result image: {exam?.resultImageUrl}</p>
				<p hidden>Edge image: {exam?.edgedResultImageUrl}</p>
				<p hidden>Overlay image: {exam?.overlayImageUrl}</p>
				<h2>SUMMARY:</h2>
				<p>Affected area ratio: <b>{affectedAreaRatio}</b></p>
				<p>Total affected area: <b>{segmentedExam?.affectedArea ?? "-"}</b> mm²</p>
				<p>Total classified area: {segmentedExam?.classifiedArea ?? "-"} mm²</p>
			</section>
			<div className="exportReportContainer">
				<Button ariaLabel="Download report as text file" variant='primary' onClick={() => downloadInnerHtml(exam?.id || "report.txt")}>Export as txt</Button>
			</div>
		</main>
	</ExamStyles.Container >;
}

export default withAuth(Exam, { strictPrivate: true });