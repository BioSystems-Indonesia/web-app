import "./CTASection.css"
import CTAImg from "@/assets/img/home/cta.png"
import LocIcon from "@/presentation/components/icon/loc.png"
import callIcon from "@/presentation/components/icon/call.png"
import Image from "next/image"


export default function CTASection() {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="head">
                    <h2>We would be glad to help you!</h2>
                </div>
                <div className="cta">
                    <div className="content">
                        <div className="addr">
                            <div className="title">
                                <Image src={LocIcon} alt="loc icon" width={33} height={33} />
                                <h5>Address</h5>
                            </div>
                            <p>Jl. Kyai Caringin No. 18-A RT 10/RW 4. Cideng, Kecamatan Gambir, Kota Jakarta Pusat. Daerah Khusus Ibukota Jakarta</p>
                        </div>
                        <div className="call">
                            <div className="title">
                                <Image src={callIcon} alt="call icon" width={33} height={33} />
                                <h5>Phone</h5>
                            </div>
                            <p>Customer Care +62 817-887-060 </p>
                            <p>Telemarketing  +62 811-712-906</p>
                        </div>
                    </div>
                    <Image src={CTAImg} alt="call to action" />
                </div>
            </div>
        </section>
    )
}