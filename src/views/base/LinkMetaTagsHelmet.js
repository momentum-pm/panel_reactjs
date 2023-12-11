import {Helmet} from "react-helmet";
import React from "react";
import History from "../../History";
import Settings from "../../Settings";

export default function LinkMetaTagsHelmet() {
    let canonical_url, farsi_url, english_url;
    let location = History.location.pathname + History.location.search;
    if (location.startsWith('/fa') || location.startsWith('/en')) {
        location = location.substring(3);
    }
    canonical_url = Settings.CLIENT_URL + location;
    farsi_url = Settings.CLIENT_URL + '/fa' + location;
    english_url = Settings.CLIENT_URL + '/en' + location;
    return (
        <Helmet>
            <link rel="canonical" href={canonical_url}/>
            <link rel="alternate" href={canonical_url} hrefLang="x-default"/>
            <link rel="alternate" href={canonical_url} hrefLang="fa"/>
            <link rel="alternate" href={farsi_url} hrefLang="fa"/>
            <link rel="alternate" href={english_url} hrefLang="en"/>
            <meta name="url" content={canonical_url}/>
            <meta itemProp="url" content={canonical_url}/>
            <meta property="og:url" content={canonical_url}/>
            <meta name="twitter:url" content={canonical_url}/>
        </Helmet>
    );
}