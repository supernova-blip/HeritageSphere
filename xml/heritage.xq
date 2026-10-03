for $monument in /heritageCollection/monument
return
    <result>
        <name>{data($monument/name)}</name>
        <period>{data($monument/historicalPeriod)}</period>
        <year>{data($monument/yearBuilt)}</year>
    </result>
