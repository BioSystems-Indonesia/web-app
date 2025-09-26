import { StaticImageData } from "next/image"
import "./NewsSection.css"
import SampleImg from "@/assets/img/home/sample.png"
import ParameterImg from "@/assets/img/home/parameters.png"
import NewSeriesImg from "@/assets/img/home/new-series.png"
import ContaimentImg from "@/assets/img/home/contaiment.png"

type NewsContent = {
    title: string
    desc: string
    image: StaticImageData
}

export default function NewsSection() {
    const news: NewsContent[] = [
        {
            title: "PARAMETERS",
            desc: "Lorem ipsum dolor sit amet",
            image: ParameterImg
        },
        {
            title: "NEW SERIES",
            desc: "Lorem ipsum dolor sit amet",
            image: NewSeriesImg
        },
        {
            title: "SAMPLE PREPARING",
            desc: "Lorem ipsum dolor sit amet",
            image: SampleImg
        },
        {
            title: "CONTAIMENT",
            desc: "Lorem ipsum dolor sit amet",
            image: ContaimentImg
        },
    ]

    return (
        <section className="news-section">
            <div className="container">
                <div className="card-container">
                    {news.map((n, index) => (
                        <div key={index} className="card" style={{ backgroundImage: `url(${n.image.src})` }}>
                            <div className="text">
                                <h3>{n.title}</h3>
                                <p>{n.desc}</p>
                                <p>Click to View More</p>
                            </div>
                            <div className="overlay"></div>
                        </div>
                    ))}
                </div>
                <div className="content">
                    <div className="text">
                        <h2>NEWS</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt leo sit amet purus congue, eget venenatis eros semper. Maecenas nisl dui, suscipit non sodales a, molestie eu sapien. Praesent libero diam, suscipit at feugiat non, sodales vehicula enim. In hac habitasse platea dictumst. Donec ultrices tellus justo, malesuada dignissim mauris dictum sit amet. Quisque a commodo ex. Nam egestas, dui ac lacinia pulvinar, metus odio malesuada mauris, id laoreet ligula neque ut ligula.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}