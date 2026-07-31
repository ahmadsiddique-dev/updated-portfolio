import React from 'react'

const HeatMap = () => {
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-2">Hackatime Activity</h2>
            <p className="text-sm text-muted-foreground">Realtime stats of Year 2026</p>
            <div className="mt-7">
                <img
                    src="https://github-readme-stats.hackclub.dev/api/wakatime?username=22817&api_domain=hackatime.hackclub.com&theme=nightowl&custom_title=Hackatime+Stats&layout=compact&cache_seconds=0&langs_count=8"
                    alt="Loading..."
                    width={495}
                    height={195}
                    className="w-full max-w-123.75 h-auto"
                />
            </div>
            <div className="my-7">
                <a href="https://heatmap.shymike.dev?id=22817&timezone=UTC&cell_size=12&ranges=83%2C30%2C10&year=current&standalone=true" title="Click to view detailed data for each day!">
                    <picture>
                        <source media="(prefers-color-scheme: dark)" srcSet="https://heatmap.shymike.dev?id=22817&timezone=UTC&cell_size=12&ranges=83%2C30%2C10&year=current&theme=dark" />
                        <img alt="Hackatime activity heatmap" src="https://heatmap.shymike.dev?id=22817&timezone=UTC&cell_size=12&ranges=83%2C30%2C10&year=current&theme=light"
                            width={900}
                            height={180}
                            className="w-full h-auto"
                        />
                    </picture>
                </a>
            </div>
        </div>
    )
}

export default HeatMap