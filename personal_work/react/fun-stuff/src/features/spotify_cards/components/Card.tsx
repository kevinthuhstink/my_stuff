import { SpotifyTrack } from "@/features/spotify_cards/api"
import "./styles/Card.scss"

export function Card({
    album,
    duration_ms,
    explicit,
    id,
    name
}: SpotifyTrack) {
    const image = album.images[0].url
    const minutes = Math.floor(duration_ms / 60000)
    const seconds = Math.floor(duration_ms % 60000 / 1000)
    const time = `${minutes}:${seconds}`

    return (
        <div className="card-wrapper">
            <header className="card-title">
                <h1 className="track-name">{name}</h1>
                <h1 className="track-time">{time}</h1>
            </header>
            <div className="card" style={{ backgroundImage: `url(${image})` }}>
                { explicit && <h1 className="explicit">EXPLICIT</h1> }
                {id}
            </div>
        </div>
    )
}
