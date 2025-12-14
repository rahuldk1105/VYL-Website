'use client'

import { useEffect, useRef } from 'react'

export default function TeamRegistrationPage() {
    const containerId = "zf_div_QxbwuPx2SA_lxP2JjBNspyPnHNhjqq4Lk80LITHG1l8"
    const formUrl = "https://forms.zohopublic.in/trackmyacademy/form/Veeran2025/formperma/QxbwuPx2SA_lxP2JjBNspyPnHNhjqq4Lk80LITHG1l8?zf_rszfm=1&zf_enablecamera=true"

    useEffect(() => {
        try {
            // Check if iframe already exists to prevent duplicates in strict mode
            const container = document.getElementById(containerId)
            if (!container || container.querySelector('iframe')) return

            const f = document.createElement("iframe")
            let ifrmSrc = formUrl

            // Optional tracking parameters handling (from provided script)
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const win = window as any
                if (typeof win.ZFAdvLead !== "undefined" && typeof win.zfutm_zfAdvLead !== "undefined") {
                    for (let prmIdx = 0; prmIdx < win.ZFAdvLead.utmPNameArr.length; prmIdx++) {
                        let utmPm = win.ZFAdvLead.utmPNameArr[prmIdx]
                        utmPm = (win.ZFAdvLead.isSameDomian && (win.ZFAdvLead.utmcustPNameArr.indexOf(utmPm) == -1)) ? "zf_" + utmPm : utmPm
                        const utmVal = win.zfutm_zfAdvLead.zfautm_gC_enc(win.ZFAdvLead.utmPNameArr[prmIdx])
                        if (typeof utmVal !== "undefined" && utmVal !== "") {
                            if (ifrmSrc.indexOf('?') > 0) {
                                ifrmSrc = ifrmSrc + '&' + utmPm + '=' + utmVal
                            } else {
                                ifrmSrc = ifrmSrc + '?' + utmPm + '=' + utmVal
                            }
                        }
                    }
                }
                if (typeof win.ZFLead !== "undefined" && typeof win.zfutm_zfLead !== "undefined") {
                    for (let prmIdx = 0; prmIdx < win.ZFLead.utmPNameArr.length; prmIdx++) {
                        const utmPm = win.ZFLead.utmPNameArr[prmIdx]
                        const utmVal = win.zfutm_zfLead.zfutm_gC_enc(win.ZFLead.utmPNameArr[prmIdx])
                        if (typeof utmVal !== "undefined" && utmVal !== "") {
                            if (ifrmSrc.indexOf('?') > 0) {
                                ifrmSrc = ifrmSrc + '&' + utmPm + '=' + utmVal
                            } else {
                                ifrmSrc = ifrmSrc + '?' + utmPm + '=' + utmVal
                            }
                        }
                    }
                }
            } catch (e) { console.error(e) }

            f.src = ifrmSrc
            f.style.border = "none"
            f.style.height = "500px" // Initial height, let script resize it
            f.style.width = "100%"
            f.style.transition = "all 0.5s ease"
            f.setAttribute("aria-label", 'Veeran Winter Cup - Team Registration form')
            f.setAttribute("allow", "camera;")

            container.appendChild(f)

            const displayMessage = (event: MessageEvent) => {
                const evntData = event.data
                if (evntData && typeof evntData === 'string') {
                    const zf_ifrm_data = evntData.split("|")
                    if (zf_ifrm_data.length === 2 || zf_ifrm_data.length === 3) {
                        const zf_perma = zf_ifrm_data[0]
                        const zf_ifrm_ht_nw = (parseInt(zf_ifrm_data[1], 10) + 15) + "px"
                        const iframe = container.getElementsByTagName("iframe")[0]

                        if (iframe && (iframe.src).indexOf('formperma') > 0 && (iframe.src).indexOf(zf_perma) > 0) {
                            const prevIframeHeight = iframe.style.height
                            let zf_tout = false
                            if (zf_ifrm_data.length === 3) {
                                iframe.scrollIntoView()
                                zf_tout = true
                            }

                            if (prevIframeHeight !== zf_ifrm_ht_nw) {
                                if (zf_tout) {
                                    setTimeout(function () {
                                        iframe.style.height = zf_ifrm_ht_nw
                                    }, 500)
                                } else {
                                    iframe.style.height = zf_ifrm_ht_nw
                                }
                            }
                        }
                    }
                }
            }

            window.addEventListener('message', displayMessage, false)

            return () => {
                window.removeEventListener('message', displayMessage)
                if (container.contains(f)) {
                    container.removeChild(f)
                }
            }

        } catch (e) {
            console.error(e)
        }
    }, [])

    return (
        <div className="pt-24 pb-16 bg-primary-dark min-h-screen">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">
                            Team Registration
                        </h1>
                        <p className="text-xl text-gray-300">
                            Veeran Winter Cup 2025
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8">
                        <div id={containerId}></div>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            Having trouble loading the form? <a href={formUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Click here to open in a new tab</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
