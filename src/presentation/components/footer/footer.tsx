"use client"
import YTIcon from "@/presentation/components/icon/yt.svg"
import IGIcon from "@/presentation/components/icon/ig.svg"
import LinkedinIcon from "@/presentation/components/icon/linkedin.svg"

import Image from "next/image"

export default function Footer() {
    return (
        <footer>
            <div className="social">
                <LinkedinIcon />
                <IGIcon />
                <YTIcon />
            </div>
            <div style={{ textAlign: 'end' }}>
                <p>All rights reserved.</p>
                <p>{new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}