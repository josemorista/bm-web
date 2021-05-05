import Head from 'next/head';
import { Button } from '../../../components/Button';
import { Checkbox } from '../../../components/Checkbox';
import { Header } from '../../../components/Header';
import { ExamStyles } from './_[examId]_styles';

export default () => {
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
						<input type="range" />
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
};