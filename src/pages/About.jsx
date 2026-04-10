import { clients } from '../data/siteData'

export default function About() {
  return (
    <div className="container">
      <h1 className="page-title">About</h1>
      <div className="about-layout">
        <div className="about-photo">
          <img src="/assets/Ted+portrait-33746941.jpg" alt="Ted Dawson" />
        </div>
        <div>
          <div className="about-bio">
            <p>
              With a unique combination of creative talent and personal service,
              Ted Dawson Studio has been working with a wide range of clients in
              the arts, education, social services, business, and religious
              institutions for over 25 years. Blending graphic design and
              illustration skills, Ted produces original solutions for his
              clients' diverse project needs.
            </p>
            <p>
              Ted Dawson moved to New York City to pursue a graduate degree in
              philosophy at the New School for Social Research after graduating
              from Marquette University with degrees in English and Philosophy.
              His love of painting and drawing soon led him to the Art Students
              League where he studied with Norman Lewis. He began studying
              graphic design and illustration at The School of Visual Arts and
              soon started working as an art director, most notably for Braniff
              Airlines. With accounts in the not-for-profit world accumulating,
              he opened Ted Dawson Studio. Performing arts, not-for-profit and
              public relations clients soon followed.
            </p>
            <p>
              Ted is a long standing board member at Bailey House, which houses
              homeless people with HIV/AIDS, and is founding member of its
              annual auction. He has also served as moderator on the board of
              directors of historic Judson Memorial Church in Greenwich Village.
              He considers himself fortunate to be able to combine a love of art
              and design with a strong commitment to public service.
            </p>
            <p>He lives with his husband, Bart Boehlert, in New York City.</p>
          </div>
          <div className="about-clients">
            <h2>Clients</h2>
            <ul className="clients-list">
              {clients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
