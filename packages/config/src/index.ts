/**
 * OpenRuleta — single source of branding, copy and event data.
 *
 * This is the only file you need to edit to make OpenRuleta your own.
 * Everything user-facing in both apps (`apps/form` and `apps/ruleta`) reads
 * from the `siteConfig` object exported at the bottom.
 *
 * Two things live outside this file on purpose:
 *   - Colour palette / fonts  ->  packages/ui/src/theme.css  (Tailwind v4 `@theme`)
 *   - The Google font import   ->  each app's src/app/layout.tsx (compile-time API)
 */

export type Sponsor = {
  name: string;
  /** Path under the app's `public/` dir. Omit to render a name-only card. */
  src?: string;
  /** Free-form tier label shown under the logo (e.g. "Gold"). Optional. */
  tier?: string;
};

export type Collaborator = {
  name: string;
  /** Path under the app's `public/` dir. Omit to render a name-only card. */
  src?: string;
};

export type DocFieldConfig = {
  /** When false, the form drops the field entirely and the DB column stays null. */
  enabled: boolean;
  label: string;
  hint: string;
  placeholder: string;
  /** Max characters accepted by the input. */
  maxLength: number;
  /** Regex source (no slashes) the value must match when the field is enabled. */
  pattern: string;
  /** Prefix shown before the masked value, e.g. "ID ••• 123". */
  displayLabel: string;
  /** Glyphs standing in for the hidden part of the value. */
  maskGlyph: string;
};

export type SiteConfig = {
  /** Product / event name. */
  name: string;
  /** Kebab-case id. Namespaces this deployment's localStorage keys. */
  slug: string;
  /** `<html lang>` value for both apps. */
  lang: string;
  /** BCP-47 locale for date/number formatting in the wheel app. */
  locale: string;

  assets: {
    /** Header wordmark, both apps. */
    logo: string;
    /** Small mark in the centre of the wheel (ruleta only). */
    wheelLogo: string;
    /** Full-screen image the ruleta projects behind "Show QR". */
    poster: string;
  };

  form: {
    meta: {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
    };
    /** Minimum length for the name field. */
    nameMinLength: number;
    docField: DocFieldConfig;
    messages: {
      sponsorsLabel: string;
      collaboratorsLabel: string;
      privacyNote: string;
      heading: string;
      subtitle: string;
      logoAlt: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      honeypotLabel: string;
      consent: string;
      termsRequired: string;
      submit: string;
      submitting: string;
      successHeading: string;
      ticketLabel: string;
      statusLabel: string;
      statusValue: string;
      deviceNote: string;
      /** Validation errors. */
      nameError: string;
      emailError: string;
      docError: string;
      /** Client transport errors. */
      offline: string;
      genericError: string;
      /** Server (route handler) errors. */
      invalidJson: string;
      invalidData: string;
      serverMisconfigured: string;
      saveFailed: string;
      duplicate: string;
    };
  };

  ruleta: {
    meta: { title: string; description: string };
    /** First-run value of the editable title above the wheel. */
    defaultTitle: string;
    /** Full turns before landing on the winning segment. */
    wheelSpins: number;
    /** Spin animation length in ms (kept in sync with the CSS transition). */
    wheelDurationMs: number;
    /** Confetti burst colours on the winner modal. */
    confettiColors: string[];
    /** Alternating fill for the wheel segments: [even, odd]. */
    wheelSegmentFills: [string, string];
    /** Solid colour of the wheel rim / single-entry disc. */
    wheelRimColor: string;
    csv: {
      filenamePrefix: string;
      headers: [string, string, string, string, string];
    };
    messages: {
      sponsorsLabel: string;
      collaboratorsLabel: string;
      privateBadge: string;
      showQr: string;
      posterAlt: string;
      close: string;
      muteSound: string;
      unmuteSound: string;
      titleAriaLabel: string;
      editTitle: string;
      spin: string;
      spinning: string;
      viewWinners: string;
      resetDraw: string;
      poolEmpty: string;
      noParticipants: string;
      participantsHeading: string;
      inPlay: string;
      refresh: string;
      refreshing: string;
      deleteAll: string;
      deletingAll: string;
      searchPlaceholder: string;
      lastUpdated: string;
      noResults: string;
      wonTag: string;
      skippedTag: string;
      newTag: string;
      deleteEntry: string;
      winnerHeading: string;
      prizeLabel: string;
      prizePlaceholder: string;
      confirmWinner: string;
      saving: string;
      spinAgain: string;
      winnersHeading: string;
      exportCsv: string;
      noWinners: string;
      addPrize: string;
      undoWinner: string;
      editPrizePrompt: string;
      /** confirm() dialogs — {name} / {n} are substituted. */
      confirmDelete: string;
      confirmDeleteAll: string;
      confirmResetWithWinners: string;
      confirmReset: string;
      /** Load / write errors surfaced under the wheel. */
      loadFailed: string;
      confirmFailed: string;
      prizeFailed: string;
      undoFailed: string;
      deleteFailed: string;
      deleteAllFailed: string;
      resetFailed: string;
      /** Route-handler error bodies. */
      listFailed: string;
      missingId: string;
      notFound: string;
      deleteRouteFailed: string;
      markFailed: string;
      prizeRouteFailed: string;
      undoRouteFailed: string;
      resetRouteFailed: string;
    };
  };

  sponsors: Sponsor[];
  collaborators: Collaborator[];
};

/** Identity helper — keeps editing type-checked without importing types by hand. */
export function defineSiteConfig(config: SiteConfig): SiteConfig {
  return config;
}

export const siteConfig = defineSiteConfig({
  name: "KCD Argentina 2026",
  slug: "kcd-argentina-2026",
  lang: "es",
  locale: "es-AR",

  assets: {
    logo: "/logo.png",
    wheelLogo: "/logos/wheel-logo.png",
    poster: "/poster.svg",
  },

  form: {
    meta: {
      title: "Sorteo — KCD Argentina 2026",
      description:
        "Dejá tus datos para participar del sorteo de KCD Argentina 2026, un evento de Kubernetes Community Days Buenos Aires.",
      ogTitle: "Sumate al sorteo de KCD Argentina 2026",
      ogDescription: "Dejá tus datos para participar del sorteo.",
    },
    nameMinLength: 2,
    docField: {
      enabled: true,
      label: "Últimos 3 dígitos de tu DNI",
      hint: "Solo guardamos los últimos 3 dígitos — nunca tu DNI completo.",
      placeholder: "ej. 123",
      maxLength: 3,
      pattern: "^\\d{3}$",
      displayLabel: "DNI",
      maskGlyph: "•••",
    },
    messages: {
      sponsorsLabel: "Sponsors",
      collaboratorsLabel: "Comunidades",
      privacyNote:
        "Usamos tus datos solo para organizar este sorteo y contactar a la persona ganadora.",
      heading: "Sorteo KCD Argentina 2026",
      subtitle:
        "Ingresá tus datos para participar del sorteo de Kubernetes Community Days Buenos Aires.",
      logoAlt: "KCD Argentina 2026",
      nameLabel: "Nombre completo",
      namePlaceholder: "ej. Ana Pérez",
      emailLabel: "Email",
      emailPlaceholder: "ana@ejemplo.com",
      honeypotLabel: "No completes este campo",
      consent:
        "Acepto participar de este sorteo y el uso de mis datos para este fin.",
      termsRequired: "Tenés que aceptar los términos para participar.",
      submit: "Participar",
      submitting: "Enviando…",
      successHeading: "¡Ya estás participando!",
      ticketLabel: "Ticket del sorteo",
      statusLabel: "Estado",
      statusValue: "CONFIRMADO",
      deviceNote:
        "Este dispositivo ya participó una vez. Una entrada por persona.",
      nameError: "Ingresá tu nombre.",
      emailError: "Ingresá un email válido.",
      docError: "Tienen que ser exactamente 3 dígitos.",
      offline: "Parece que estás sin conexión. Revisá tu internet.",
      genericError: "No se pudo enviar el formulario.",
      invalidJson: "JSON inválido.",
      invalidData: "Datos inválidos.",
      serverMisconfigured:
        "Configuración del servidor incompleta (Supabase): faltan variables de entorno.",
      saveFailed: "No se pudo guardar. Intentá de nuevo.",
      duplicate: "Ese email ya está participando.",
    },
  },

  ruleta: {
    meta: {
      title: "Ruleta de ganadores — KCD Argentina 2026",
      description:
        "Ruleta local para elegir ganadores del sorteo de KCD Argentina 2026.",
    },
    defaultTitle: "Sorteo KCD Argentina 2026",
    wheelSpins: 6,
    wheelDurationMs: 4600,
    confettiColors: ["#2563eb", "#38bdf8", "#14b8a6", "#f59e0b", "#ffffff"],
    wheelSegmentFills: ["#2563eb", "#0d1117"],
    wheelRimColor: "#38bdf8",
    csv: {
      filenamePrefix: "ganadores-kcd-2026",
      headers: ["nombre", "email", "dni_ult_3", "premio", "ganó_el"],
    },
    messages: {
      sponsorsLabel: "Sponsors",
      collaboratorsLabel: "Comunidades",
      privateBadge: "Privado · vista local",
      showQr: "Mostrar QR",
      posterAlt: "Escaneá el código QR para participar del sorteo",
      close: "Cerrar (Esc)",
      muteSound: "Silenciar ruleta",
      unmuteSound: "Activar sonido",
      titleAriaLabel: "Título del sorteo",
      editTitle: "Editar título",
      spin: "Girar",
      spinning: "Girando…",
      viewWinners: "Ver ganadores ({n})",
      resetDraw: "Reiniciar sorteo (volver a meter a todos)",
      poolEmpty: "No queda nadie en el pozo.",
      noParticipants: "Todavía no hay participantes. Compartí el formulario.",
      participantsHeading: "Participantes — {n}",
      inPlay: "{n} en juego",
      refresh: "Actualizar participantes",
      refreshing: "Actualizando…",
      deleteAll: "Eliminar todos los participantes",
      deletingAll: "Eliminando…",
      searchPlaceholder: "Buscar participante…",
      lastUpdated: "Última actualización {time}",
      noResults: "No hay resultados para esa búsqueda.",
      wonTag: "ganó",
      skippedTag: "afuera",
      newTag: "Nuevo",
      deleteEntry: "Eliminar de la base de datos",
      winnerHeading: "Ganador/a",
      prizeLabel: "Premio (opcional)",
      prizePlaceholder: "ej. Gift card, libro, remera…",
      confirmWinner: "Confirmar ganador/a",
      saving: "Guardando…",
      spinAgain: "Saltear y girar de nuevo",
      winnersHeading: "Ganadores ({n})",
      exportCsv: "Exportar CSV",
      noWinners: "Todavía no hay ganadores.",
      addPrize: "+ premio",
      undoWinner: "Deshacer (volver al pozo)",
      editPrizePrompt: "Premio para {name}:",
      confirmDelete:
        "¿Eliminar a {name} de la base de datos? Esta acción no se puede deshacer.",
      confirmDeleteAll:
        "Estás por ELIMINAR a los {n} participantes. Esta acción no se puede deshacer. ¿Estás seguro/a?",
      confirmResetWithWinners:
        "Esto vuelve a meter a {n} ganador(es) en el pozo. ¿Estás seguro/a?",
      confirmReset: "¿Reiniciar el sorteo?",
      loadFailed: "No se pudo cargar la lista.",
      confirmFailed: "No se pudo confirmar al ganador/a. Intentá de nuevo.",
      prizeFailed: "No se pudo guardar el premio.",
      undoFailed: "No se pudo deshacer.",
      deleteFailed: "No se pudo eliminar al participante.",
      deleteAllFailed: "No se pudo eliminar a los participantes.",
      resetFailed: "No se pudo reiniciar.",
      listFailed: "No se pudo leer la lista desde Supabase.",
      missingId: "Falta el id.",
      notFound: "No se encontró al participante.",
      deleteRouteFailed: "No se pudo eliminar.",
      markFailed: "No se pudo confirmar.",
      prizeRouteFailed: "No se pudo guardar el premio.",
      undoRouteFailed: "No se pudo deshacer.",
      resetRouteFailed: "No se pudo reiniciar.",
    },
  },

  sponsors: [
    { name: "Crubyt", src: "/logos/crubyt.webp", tier: "Diamante" },
    { name: "Valkey", src: "/logos/valkey.svg", tier: "Platinum" },
    { name: "CNCF", src: "/logos/cncf.png", tier: "Platinum" },
    { name: "Red Hat", src: "/logos/red-hat.svg", tier: "Gold" },
    { name: "PowerCloud", src: "/logos/powercloud.svg", tier: "Gold" },
    { name: "Coroot", src: "/logos/coroot.png", tier: "Gold" },
    { name: "Finnegans", src: "/logos/finnegans.svg", tier: "Gold" },
    { name: "nullplatform", src: "/logos/nullplatform.svg", tier: "Gold" },
    { name: "Banco Galicia", src: "/logos/banco-galicia.png", tier: "Venue" },
  ],
  collaborators: [
    {
      name: "AWS Student Builder Group UNDAV",
      src: "/logos/aws-sbg-undav.png",
    },
    { name: "STEAM Girls", src: "/logos/steam-girls.png" },
    { name: "whatIDO_", src: "/logos/whatido.png" },
    { name: "Jala University", src: "/logos/jala-university.png" },
    { name: "AWS WIC", src: "/logos/aws-wic.png" },
    { name: "Nerdearla", src: "/logos/nerdearla.webp" },
    { name: "AWS Security UG Argentina", src: "/logos/aws-security-ug.png" },
    { name: "Cloud Native CDMX", src: "/logos/cloud-native-cdmx.png" },
  ],
});
