import "./ClincalAnalysis.css"
import { MdArrowOutward } from "react-icons/md";
export default function ClincalAnalysisSection() {
    return (
        <section className="clinical-analysis">
            <div className="container">
                <h1>
                    <span className="line-1">Clinical</span>
                    <span className="line-2">Analysis</span>
                </h1>
                <MdArrowOutward color="white" size={90} />
            </div>
        </section>
    )
}