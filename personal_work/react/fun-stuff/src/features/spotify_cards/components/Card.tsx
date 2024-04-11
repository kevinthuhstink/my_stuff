import "./styles/Card.scss"

interface CardProps {
    title: string
    image: string
    explicit?: boolean
}

export function Card({ title, image, explicit=false }: CardProps) {
    return (
        <div className="card" style={{ backgroundImage: image }}>
            <h1>{title}</h1>
            { explicit && <h1 className="explicit">EXPLICIT</h1> }
        </div>
    )
}
