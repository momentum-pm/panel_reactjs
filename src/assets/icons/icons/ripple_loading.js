import React from "react";

export const ripple_loading = (
    <svg className={'ripple-loading icon-root'} width="24px"
         height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle className={'ripple-loading-circle'} cx="50" cy="50" r="45" strokeWidth="10"
                strokeDasharray="70.685834706 70.685834706" fill="none" strokeLinecap="round"
                transform="rotate(5.18832 50 50)">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1"
                              values="0 50 50;360 50 50"/>
        </circle>
    </svg>
);
