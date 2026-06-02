import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";

/**
 * Mentions légales — required disclosure page for any French website
 * publishing services to the public (LCEN, art. 6-III), and reinforced
 * for medical practitioners by the Code de déontologie médicale.
 *
 * Identifiers that must be provided by the doctor herself (RPPS, SIRET,
 * numéro d'inscription à l'Ordre, secteur conventionnel) are left as a
 * single "à compléter" placeholder rather than invented — wrong values
 * here would be far more harmful than missing ones.
 */

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's "%s · Dr. Alexandra Soldea" template
  // so the rendered <title> matches the legal page spec exactly.
  title: { absolute: "Mentions légales | Dr. Alexandra Soldea" },
  description:
    "Mentions légales du site du Dr. Alexandra Soldea, gynécologue obstétricienne à Lyon et Miribel.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              { name: "Mentions légales", path: "/mentions-legales" },
            ]),
          ),
        }}
      />
      <Header />
      <Body />
    </>
  );
}

/* -------------------------------------------------------------------- */
/* Header                                                                */
/* -------------------------------------------------------------------- */

function Header() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft opacity-50" />
      <div className="container-page relative pt-24 pb-14 md:pt-32 md:pb-20 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur ring-1 ring-line px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-primary-deep">
          Informations légales
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4rem)] leading-[1] tracking-[-0.01em] text-ink text-balance">
          Mentions légales
        </h1>
        <p className="mt-6 text-lg text-ink-soft text-pretty">
          Conformément aux dispositions de la loi n°&nbsp;2004-575 du 21
          juin&nbsp;2004 pour la confiance dans l&apos;économie numérique, il
          est précisé aux utilisateurs du site les présentes mentions légales.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/* Body                                                                  */
/* -------------------------------------------------------------------- */

function Body() {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-line">
      <div className="container-page grid lg:grid-cols-[1fr_2.4fr] gap-10 lg:gap-16 items-start">
        {/* Sticky table of contents */}
        <nav
          aria-label="Sommaire"
          className="lg:sticky lg:top-28 text-sm text-ink-soft"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-primary mb-4">
            Sommaire
          </p>
          <ol className="space-y-2.5 border-l border-line pl-5">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="hover:text-primary-deep transition-colors"
                >
                  <span className="text-muted mr-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Content sections */}
        <div className="space-y-12 max-w-3xl">
          {SECTIONS.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="scroll-mt-28"
              aria-labelledby={`${s.id}-heading`}
            >
              <h2
                id={`${s.id}-heading`}
                className="font-display text-2xl md:text-3xl text-ink leading-snug text-balance"
              >
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 text-ink-soft leading-relaxed text-pretty">
                {s.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/* Reusable presentational pieces                                       */
/* -------------------------------------------------------------------- */

function DefList({
  items,
}: {
  items: { label: string; value: React.ReactNode }[];
}) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-6 gap-y-2 text-ink">
      {items.map((item) => (
        <div key={item.label} className="contents">
          <dt className="text-[11px] tracking-[0.2em] uppercase text-muted pt-1">
            {item.label}
          </dt>
          <dd className="text-ink-soft">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------- */
/* Section content                                                       */
/*                                                                       */
/* Anything left intentionally vague (e.g. RPPS, SIRET) is surfaced as a */
/* single "à compléter" line per the request — wrong identifiers cause   */
/* more harm than missing ones for a medical website.                    */
/* -------------------------------------------------------------------- */

const SECTIONS: { id: string; title: string; content: React.ReactNode }[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    content: (
      <>
        <p>
          Le présent site est édité par le <strong>Dr. Alexandra Soldea</strong>,
          médecin gynécologue obstétricienne, exerçant à titre individuel.
        </p>
        <DefList
          items={[
            {
              label: "Profession",
              value:
                "Médecin gynécologue obstétricienne, échographiste agréée du réseau de périnatalité Aurore",
            },
            {
              label: "Cabinet Lyon",
              value: "4 rue du Président Carnot, 69002 Lyon",
            },
            {
              label: "Cabinet Miribel",
              value: "63 place de la République, 01700 Miribel",
            },
            {
              label: "Téléphone",
              value: (
                <a
                  href="tel:+33428295516"
                  className="hover:text-primary-deep underline-offset-4 hover:underline"
                >
                  04 28 29 55 16
                </a>
              ),
            },
            {
              label: "E-mail",
              value: (
                <a
                  href="mailto:info@echographielyon.fr"
                  className="hover:text-primary-deep underline-offset-4 hover:underline"
                >
                  info@echographielyon.fr
                </a>
              ),
            },
            {
              label: "Site",
              value: (
                <a
                  href="https://www.echographielyon.fr"
                  className="hover:text-primary-deep underline-offset-4 hover:underline"
                >
                  https://www.echographielyon.fr
                </a>
              ),
            },
          ]}
        />
        <p className="text-sm text-muted mt-6">
          RPPS / SIRET / numéro d&apos;inscription à l&apos;Ordre des médecins :
          à compléter. Secteur conventionnel : à compléter.
        </p>
      </>
    ),
  },
  {
    id: "responsable",
    title: "Responsable de la publication",
    content: (
      <p>
        La directrice de la publication est le{" "}
        <strong>Dr. Alexandra Soldea</strong>, joignable par téléphone au{" "}
        <a
          href="tel:+33428295516"
          className="underline-offset-4 hover:underline text-ink"
        >
          04 28 29 55 16
        </a>{" "}
        ou par e-mail à l&apos;adresse{" "}
        <a
          href="mailto:info@echographielyon.fr"
          className="underline-offset-4 hover:underline text-ink"
        >
          info@echographielyon.fr
        </a>
        .
      </p>
    ),
  },
  {
    id: "coordonnees",
    title: "Coordonnées",
    content: (
      <>
        <p>
          Pour toute question concernant le site ou la prise de rendez-vous,
          vous pouvez utiliser{" "}
          <Link
            href="/contact"
            className="text-ink underline-offset-4 hover:underline"
          >
            le formulaire de contact
          </Link>{" "}
          ou contacter directement le secrétariat aux coordonnées ci-dessus.
        </p>
        <p>
          Les rendez-vous médicaux se prennent en ligne via la page{" "}
          <Link
            href="/services"
            className="text-ink underline-offset-4 hover:underline"
          >
            Services
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement",
    content: (
      <>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>, prestataire
          d&apos;hébergement applicatif de l&apos;éditeur du site. Les contenus
          sont diffusés depuis l&apos;infrastructure mondiale de Vercel via son
          réseau de distribution de contenus.
        </p>
        <DefList
          items={[
            { label: "Hébergeur", value: "Vercel Inc." },
            {
              label: "Site web",
              value: (
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-deep underline-offset-4 hover:underline"
                >
                  https://vercel.com
                </a>
              ),
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "conception",
    title: "Conception et développement",
    content: (
      <>
        <p>
          Conception, design et développement du site web :{" "}
          <a
            href="https://www.itaiwebsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline-offset-4 hover:underline"
          >
            <strong>ITAI Web Solutions</strong>
          </a>
          .
        </p>
        <p>
          Le site est développé avec le framework Next.js (React) et déployé sur
          l&apos;infrastructure Vercel.
        </p>
      </>
    ),
  },
  {
    id: "propriete-intellectuelle",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, photographies,
          graphismes, logos, vidéos, icônes, sons, logiciels) est la propriété
          exclusive du Dr.&nbsp;Alexandra Soldea ou de ses partenaires, et est
          protégé par les lois françaises et internationales relatives à la
          propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication,
          adaptation, totale ou partielle, des éléments du site, quel que soit
          le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation
          écrite préalable de l&apos;éditeur, à l&apos;exception d&apos;un
          usage strictement privé.
        </p>
        <p>
          Toute exploitation non autorisée du site ou de l&apos;un quelconque
          de ses éléments peut faire l&apos;objet de poursuites au titre de la
          contrefaçon (articles L.&nbsp;335-2 et suivants du Code de la
          propriété intellectuelle).
        </p>
      </>
    ),
  },
  {
    id: "donnees-personnelles",
    title: "Données personnelles",
    content: (
      <>
        <p>
          Conformément au Règlement&nbsp;(UE) 2016/679 du 27&nbsp;avril&nbsp;2016
          (RGPD) et à la loi Informatique et Libertés modifiée, vous disposez
          d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
          limitation, de portabilité et d&apos;opposition au traitement des
          données personnelles vous concernant.
        </p>
        <p>
          Les données collectées via le formulaire de contact (nom, prénom,
          e-mail, téléphone, message) sont utilisées uniquement pour répondre à
          votre demande et ne sont en aucun cas cédées à des tiers à des fins
          commerciales. Elles sont conservées le temps strictement nécessaire au
          traitement de la demande.
        </p>
        <p>
          Pour exercer vos droits ou pour toute question relative au traitement
          de vos données, écrivez à{" "}
          <a
            href="mailto:info@echographielyon.fr"
            className="text-ink underline-offset-4 hover:underline"
          >
            info@echographielyon.fr
          </a>
          . Vous disposez également du droit d&apos;introduire une réclamation
          auprès de la CNIL (
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline-offset-4 hover:underline"
          >
            www.cnil.fr
          </a>
          ).
        </p>
        <p>
          Les données médicales recueillies dans le cadre des consultations sont
          régies par le secret médical et conservées conformément aux
          obligations déontologiques et réglementaires applicables aux
          professionnels de santé.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies et mesure d'audience",
    content: (
      <>
        <p>
          Le site n&apos;utilise pas de cookies publicitaires ni de cookies de
          suivi à des fins marketing. Seuls les cookies strictement nécessaires
          au fonctionnement du site et de ses services tiers (notamment le
          module de prise de rendez-vous Calendly et les cartes Google Maps
          intégrées sur la page Contact) peuvent être déposés.
        </p>
        <p>
          Vous pouvez à tout moment configurer votre navigateur pour refuser
          l&apos;ensemble des cookies ; certaines fonctionnalités du site
          (notamment la prise de rendez-vous en ligne et l&apos;affichage des
          cartes) pourraient alors ne plus être disponibles.
        </p>
      </>
    ),
  },
  {
    id: "responsabilite-medicale",
    title: "Responsabilité médicale",
    content: (
      <>
        <p>
          Les informations diffusées sur ce site sont fournies à titre indicatif
          et informatif. Elles ne constituent en aucun cas un avis médical, un
          diagnostic ni une prescription, et ne peuvent se substituer à une
          consultation auprès d&apos;un professionnel de santé.
        </p>
        <p>
          En cas de doute, de symptôme ou de question médicale, consultez votre
          médecin traitant, un spécialiste ou rendez-vous dans le service
          d&apos;urgence le plus proche.
        </p>
        <p className="rounded-2xl bg-cream ring-1 ring-line px-5 py-4 text-sm text-ink">
          <strong>Urgences&nbsp;:</strong>
          {" "}en cas d&apos;urgence vitale ou obstétricale, composez
          immédiatement le <strong>15</strong>
          {" "}(SAMU) ou le <strong>112</strong>
          {" "}(numéro d&apos;urgence européen).
        </p>
        <p>
          L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude des
          informations publiées, sans toutefois pouvoir en garantir
          l&apos;exhaustivité ni l&apos;absence d&apos;erreur. Sa responsabilité
          ne saurait être engagée du fait d&apos;une information manquante,
          inexacte ou non mise à jour.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>
          Pour toute question relative aux présentes mentions légales ou au
          contenu du site, vous pouvez nous contacter&nbsp;:
        </p>
        <ul className="space-y-1.5">
          <li>
            par e-mail à{" "}
            <a
              href="mailto:info@echographielyon.fr"
              className="text-ink underline-offset-4 hover:underline"
            >
              info@echographielyon.fr
            </a>
          </li>
          <li>
            par téléphone au{" "}
            <a
              href="tel:+33428295516"
              className="text-ink underline-offset-4 hover:underline"
            >
              04 28 29 55 16
            </a>
          </li>
          <li>
            via{" "}
            <Link
              href="/contact"
              className="text-ink underline-offset-4 hover:underline"
            >
              le formulaire de contact du site
            </Link>
          </li>
        </ul>
      </>
    ),
  },
];
