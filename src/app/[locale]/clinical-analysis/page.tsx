import Header from "@/presentation/components/header/header"
import ClincalAnalysisSection from "@/presentation/home/clinicalAnalysis/ClincalAnalysis"
import OurProductsSection from "@/presentation/clinicalAnalysis/ourProducts/ourProuduts"
import TestingParameterSection from "@/presentation/clinicalAnalysis/ourParameter/testingParameter"
import CTASection from "@/presentation/home/cta/CTASection"
import Footer from "@/presentation/components/footer/footer"
export default function ClincalAnalysis() {
    return (
        <div className="ClinicalAnalysis">
            <Header />
            <ClincalAnalysisSection />
            <OurProductsSection />
            <TestingParameterSection />
            <CTASection contentBg="#FF5A00" contentColor="#fff" iconColor="#fff" />
            <Footer bgColor=" #FF5A00" />
        </div>
    )
}