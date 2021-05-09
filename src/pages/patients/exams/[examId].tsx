import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { Header } from '../../../components/Header';
import { ROUTES } from '../../../consts';
import { IExam } from '../../../domain/modules/exams/entities/IExam';
import { CreateExamsServicesFactory } from '../../../domain/modules/exams/factories/CreateExamsServicesFactory';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { ExamStyles } from './_[examId]_styles';

const processExamService = CreateExamsServicesFactory.createProcessExamService();
const getExamByIdService = CreateExamsServicesFactory.createGetExamByIdService();

export default function Exam() {

	const { token } = useAuthentication();

	const router = useRouter();
	const { examId } = router.query;
	const debounce = useRef<null | NodeJS.Timeout>(null);
	const [exam, setExam] = useState<IExam | null | undefined>(null);

	const getExam = useCallback(async () => {
		const resp = await getExamByIdService.execute({
			examId: String(examId),
			authorizeToken: token
		});
		if (resp) {
			setExam(resp);
		} else {
			Router.replace(ROUTES.MY_PATIENTS);
		}
	}, [token, examId]);

	useEffect(() => {
		if (exam === undefined) {
			getExam();
		}
	}, [exam, getExam]);

	const handleProcessExam = async (threshold: number): Promise<void> => {
		try {
			await processExamService.execute({
				examId: String(examId),
				threshold,
				authorizeToken: token
			});
		} catch (error) {
			console.error(error);
		}
	};

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
				<Button variant="secondary">
					Back
				</Button>
			</header>
			<h2>
				Segmentation & Classification
			</h2>
			<section className="segmentationAndClassification">
				<ul>
					<li>
						<img src="/assets/imgs/png/test01.png" alt="" />
					</li>
					<li>
						<img src="/assets/imgs/png/test02.png" alt="" />
					</li>
					<li>
						<img src="/assets/imgs/png/test03.png" alt="" />
					</li>
				</ul>

				<section className="segmentationOptions">
					<section className="threshold">
						<h6>Classifier probability threshold</h6>
						<legend>
							Lower probability allows more detections but with less  precision
						</legend>
						<input onChange={e => {
							if (debounce.current) {
								clearTimeout(debounce.current);
							}
							debounce.current = setTimeout(() => {
								handleProcessExam(Number(e.target.value));
							}, 1000);
						}} type="range" defaultValue="0.4" min="0" max="1" step="0.1" />
					</section>
					<section className="contrast">
						<h6>Visualization contrast</h6>
						<div>
							<span className="whiteContrast"></span>
							<span className="blackContrast"></span>
						</div>
					</section>
					<section>
						<h6>Visualizations:</h6>
						<ul>
							<li>
								<Checkbox label="Original + segmented + overlay" />
								<Checkbox label="Original + segmented + overlay" />
								<Checkbox label="Original + segmented + overlay" />
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
	</ExamStyles.Container>;
}