import React from "react";


export default function LoginBackground({children, className} : {children: React.ReactNode, className?: string}) {

    return (
        <div className={"relative isolate overflow-visible bg-background min-h-screen min-w-screen"}>
            <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
                {/* Forme violette */}
                <div
                    className="absolute left-[-15%] top-[25%] h-[400px] w-[400px] rounded-full bg-purple-500 opacity-30 blur-3xl"
                    aria-hidden="true"
                />
                {/* Forme bleue */}
                <div
                    className="absolute right-[-15%] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-500 opacity-30 blur-3xl"
                    aria-hidden="true"
                />
            </div>
            <div className={"relative z-10 flex items-center justify-center min-h-screen" + className}  >{children}</div>
        </div>
    );
}