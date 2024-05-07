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

    return (
        <div className="card" style={{ backgroundImage: image }}>
            <h1>{name}</h1>
            { explicit && <h1 className="explicit">EXPLICIT</h1> }
            {duration_ms}
            {id}
        </div>
    )
}
