import React, { useState } from 'react';
import {
  Download,
  Mail,
  Settings as SettingsIcon,
  User,
  Sun,
  Moon,
  Bell,
  Share2,
  LogOut,
  LayoutDashboard,
  ListChecks,
  Folder,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import {
  CyButton,
  CyAnimatedButton,
  CyCard,
  CyBadge,
  CyInput,
  CyTextarea,
  CyStatus,
  CyLogo,
  CySpinner,
  CyMenuToggle,
  CyShaderBg,
  CyLiveDot,
  CyLinkPill,
  CyAuroraBg,
  CyGradientText,
  CyScrollHint,
  CyReveal,
  CyRoadmapStrip,
  CyCtaBanner,
  AppCounterButton,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  AppButton,
  AppCheckbox,
  AppSelect,
  AppSelectTrigger,
  AppSelectValue,
  AppSelectContent,
  AppSelectItem,
  AppSelectGroup,
  AppSelectLabel,
  AppTabs,
  AppTabsList,
  AppTabsTab,
  AppTabsPanel,
  AppToggle,
  AppEditableChip,
  AppDropdownMenu,
  AppDropdownMenuTrigger,
  AppDropdownMenuContent,
  AppDropdownMenuItem,
  AppDropdownMenuLabel,
  AppDropdownMenuSeparator,
  AppDropdownMenuPage,
  AppDropdownMenuPageTrigger,
  AppDropdownMenuCheckboxItem,
  AppDropdownMenuRadioGroup,
  AppDropdownMenuRadioItem,
  AppSidebar,
  type AppSidebarSection,
  AppPagination,
  AppPaginationContent,
  AppPaginationItem,
  AppPaginationEllipsis,
  useToasts,
  AppDialog,
  AppDialogTrigger,
  AppDialogContent,
  AppDialogHeader,
  AppDialogTitle,
  AppDialogDescription,
  AppDialogBody,
  AppDialogFooter,
  AppDialogClose,
  AppDataTable,
  type ColumnDef,
  AppAvatar,
  AppAvatarImage,
  AppAvatarFallback,
  AppSkeleton,
} from './components';
import { Header } from './docs/Header';
import { Sidebar } from './docs/Sidebar';
import { DocSection } from './docs/DocSection';
import { DocSubSection } from './docs/DocSubSection';
import { DocBlock } from './docs/DocBlock';
import { CodeBlock } from './docs/CodeBlock';
import { ColorSwatch } from './docs/ColorSwatch';
import { RulesBox } from './docs/RulesBox';

const grid = (cols: number, gap = 16): React.CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
  gap,
});

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: 48,
            maxWidth: 920,
            paddingBottom: 80,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--cy-font-body)',
              fontSize: 'var(--cy-text-sm)',
              color: 'var(--cy-text-secondary)',
              marginBottom: 48,
              maxWidth: 680,
              lineHeight: 1.7,
            }}
          >
            Ce document présente le design system complet de Cyrano. Il sert de référence
            pour les développeurs humains et les IAs (Cursor, Lovable, Claude Code) pour
            maintenir une cohérence visuelle et technique à travers tout le projet.
          </p>

          <ColorsSection />
          <TypographySection />
          <ButtonsSection />
          <AnimationsSection />
          <ComponentsCoreSection />
          <ComponentsAppSection />
          <LayoutSection />
          <InteractionsSection />
          <ZIndexSection />
          <BrandSection />
          <AIGuidelinesSection />
        </main>
      </div>
    </>
  );
};

/* ============================================================
   COULEURS
   ============================================================ */

const ColorsSection: React.FC = () => (
  <DocSection id="colors" title="Palette de couleurs" first>
    <DocSubSection
      title="Couleur primaire — Green"
      description="Le vert Cyrano. Couleur signature, à utiliser pour toutes les actions principales, états de succès, accents visuels et éléments interactifs majeurs."
    >
      <div style={grid(5, 12)}>
        <ColorSwatch name="green-300" hex="#74ffc5" />
        <ColorSwatch name="green-400" hex="#30f8a5" />
        <ColorSwatch name="green-500" hex="#05d37e" />
        <ColorSwatch name="green-600" hex="#00bc6f" />
        <ColorSwatch name="green-700" hex="#029358" />
      </div>
    </DocSubSection>

    <DocSubSection
      title="Couleur secondaire — Deep"
      description="Bleu/teal sombre Cyrano. Backgrounds, surfaces élevées, sections sombres. Le deep-950 est le fond global en mode dark."
    >
      <div style={grid(5, 12)}>
        <ColorSwatch name="deep-600" hex="#016c78" />
        <ColorSwatch name="deep-700" hex="#014751" />
        <ColorSwatch name="deep-800" hex="#063841" />
        <ColorSwatch name="deep-900" hex="#111827" />
        <ColorSwatch name="deep-950" hex="#030712" />
      </div>
    </DocSubSection>

    <DocSubSection
      title="Couleurs neutres — Gray"
      description="Pour le texte secondaire, les bordures et les surfaces neutres."
    >
      <div style={grid(7, 12)}>
        <ColorSwatch name="gray-300" hex="#d1d5db" height={70} />
        <ColorSwatch name="gray-400" hex="#9ca3af" height={70} />
        <ColorSwatch name="gray-500" hex="#6b7280" height={70} />
        <ColorSwatch name="gray-600" hex="#4b5563" height={70} />
        <ColorSwatch name="gray-700" hex="#374151" height={70} />
        <ColorSwatch name="gray-800" hex="#1f2937" height={70} />
        <ColorSwatch name="gray-900" hex="#111827" height={70} />
      </div>
    </DocSubSection>

    <DocSubSection
      title="Dégradés signatures"
      description="Les 5 dégradés à utiliser dans tout le produit. Aucun autre dégradé n'est autorisé."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <GradientRow
          name="Principal"
          gradient="linear-gradient(to right, var(--cy-green-400), var(--cy-green-500))"
          usage="CTA primaire, boutons d'action"
          code="from-green-400 to-green-500"
        />
        <GradientRow
          name="Alternatif"
          gradient="linear-gradient(to right, var(--cy-green-500), var(--cy-green-600))"
          usage="Hover des CTAs primaires"
          code="from-green-500 to-green-600"
        />
        <GradientRow
          name="Hover"
          gradient="linear-gradient(to right, var(--cy-green-600), var(--cy-green-700))"
          usage="État pressé, accents foncés"
          code="from-green-600 to-green-700"
        />
        <GradientRow
          name="Featured"
          gradient="linear-gradient(to right, var(--cy-deep-950), var(--cy-deep-600) 50%, var(--cy-green-400))"
          usage="Sections premium, hero internes"
          code="from-deep-950 via-deep-600 to-green-400"
        />
        <GradientRow
          name="Disabled"
          gradient="linear-gradient(to right, var(--cy-gray-700), var(--cy-gray-800))"
          usage="État désactivé des boutons primaires"
          code="from-gray-700 to-gray-800"
        />
      </div>
    </DocSubSection>

    <DocSubSection
      title="Shadows / élévation"
      description="Quatre paliers d'ombres neutres, thémables (opacités fortes en dark, douces en light). Toujours via tokens — jamais d'rgba(0,0,0,0.x) en dur dans les composants. Les ombres vertes des CTAs sont gérées dans les composants Cy* directement, pas en token DS."
    >
      <div style={grid(4, 16)}>
        <ShadowSwatch token="--cy-shadow-sm" usage="Hover de cartes, chips" />
        <ShadowSwatch token="--cy-shadow-md" usage="Cartes au repos, panneaux" />
        <ShadowSwatch token="--cy-shadow-lg" usage="Modals, dropdowns, popovers" />
        <ShadowSwatch token="--cy-shadow-xl" usage="Hero shots, focus elements" />
      </div>
      <CodeBlock
        lang="tsx"
        code={`<div style={{ boxShadow: 'var(--cy-shadow-md)' }} />
<div className="rounded-2xl" style={{ boxShadow: 'var(--cy-shadow-lg)' }} />`}
      />
    </DocSubSection>

    <DocSubSection
      title="Exemple d'utilisation"
      description="Trois cas typiques d'usage des dégradés et couleurs Cyrano."
    >
      <CodeBlock
        lang="tsx"
        code={`// Bouton avec dégradé principal
<button className="bg-gradient-to-r from-green-400 to-green-500 text-deep-950 rounded-full px-6 py-3 font-semibold">
  Réserver un audit
</button>

// Texte avec dégradé via bg-clip-text
<h1 className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
  Hero Title
</h1>

// Background avec opacity
<div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
  Bloc avec accent vert subtil
</div>`}
      />
    </DocSubSection>

  </DocSection>
);

const GradientRow: React.FC<{ name: string; gradient: string; usage: string; code: string }> = ({
  name,
  gradient,
  usage,
  code,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: 16,
      background: 'var(--cy-bg-elevated)',
      border: '1px solid var(--cy-border)',
      borderRadius: 'var(--cy-radius-xl)',
    }}
  >
    <div
      style={{
        width: 80,
        height: 50,
        borderRadius: 'var(--cy-radius-lg)',
        background: gradient,
        flexShrink: 0,
      }}
    />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span
        style={{
          fontFamily: 'var(--cy-font-heading)',
          fontWeight: 600,
          fontSize: 'var(--cy-text-sm)',
          color: 'var(--cy-text-primary)',
        }}
      >
        {name}
      </span>
      <span style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-text-secondary)' }}>{usage}</span>
    </div>
    <code
      style={{
        fontFamily: 'ui-monospace, monospace',
        fontSize: 11,
        color: 'var(--cy-green-400)',
        background: 'var(--cy-bg-code)',
        padding: '6px 10px',
        borderRadius: 'var(--cy-radius-lg)',
      }}
    >
      {code}
    </code>
  </div>
);

const ShadowSwatch: React.FC<{ token: string; usage: string }> = ({ token, usage }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 20,
      background: 'var(--cy-bg-elevated)',
      border: '1px solid var(--cy-border)',
      borderRadius: 'var(--cy-radius-xl)',
    }}
  >
    <div
      style={{
        height: 64,
        borderRadius: 'var(--cy-radius-lg)',
        background: 'var(--cy-bg-muted)',
        boxShadow: `var(${token})`,
      }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <code
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 11,
          color: 'var(--cy-green-400)',
        }}
      >
        {token}
      </code>
      <span style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-text-secondary)' }}>{usage}</span>
    </div>
  </div>
);

/* ============================================================
   TYPOGRAPHIE
   ============================================================ */

const TypographySection: React.FC = () => (
  <DocSection id="typography" title="Typographie">
    <DocSubSection
      title="Familles de polices"
      description="Deux familles. Poppins pour les titres et accents typographiques. Satoshi pour le corps de texte et l'UI."
    >
      <div style={grid(2, 16)}>
        <DocBlock>
          <span
            style={{
              fontSize: 'var(--cy-text-xs)',
              fontWeight: 600,
              color: 'var(--cy-text-tertiary)',
              letterSpacing: '0.08em',
            }}
          >
            HEADING FONT
          </span>
          <div
            style={{
              fontFamily: 'var(--cy-font-heading)',
              fontWeight: 700,
              fontSize: 'var(--cy-text-3xl)',
              marginTop: 12,
              letterSpacing: 'var(--cy-tracking-tight)',
            }}
          >
            Poppins
          </div>
          <div style={{ marginTop: 8, fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)' }}>
            Weights 400 à 800. Letter-spacing négatif pour les gros titres.
          </div>
        </DocBlock>
        <DocBlock>
          <span
            style={{
              fontSize: 'var(--cy-text-xs)',
              fontWeight: 600,
              color: 'var(--cy-text-tertiary)',
              letterSpacing: '0.08em',
            }}
          >
            BODY FONT
          </span>
          <div
            style={{
              fontFamily: 'var(--cy-font-body)',
              fontWeight: 600,
              fontSize: 'var(--cy-text-3xl)',
              marginTop: 12,
            }}
          >
            Satoshi
          </div>
          <div style={{ marginTop: 8, fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)' }}>
            Variable 100 à 900. Tout le corps de texte, UI, formulaires.
          </div>
        </DocBlock>
      </div>
    </DocSubSection>

    <DocSubSection
      title="Hiérarchie des titres"
      description="Quatre niveaux de titre. Trois paliers fixes par titre (mobile / tablet / desktop). Le H1 utilise le dégradé principal en bg-clip-text."
    >
      <DocBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div
              className="text-[36px] sm:text-[44px] lg:text-[56px]"
              style={{
                fontFamily: 'var(--cy-font-heading)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: 'var(--cy-tracking-tighter)',
                background: 'var(--cy-gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Hero Title
            </div>
            <code style={{ fontSize: 11, color: 'var(--cy-text-tertiary)' }}>
              H1 — Poppins 800 — 36 / 44 / 56px (mobile / tablet / desktop), line-height 1.05, gradient text
            </code>
          </div>
          <div>
            <div
              className="text-[28px] sm:text-[32px] lg:text-[36px]"
              style={{
                fontFamily: 'var(--cy-font-heading)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: 'var(--cy-tracking-tight)',
                color: 'var(--cy-text-primary)',
              }}
            >
              Section Title
            </div>
            <code style={{ fontSize: 11, color: 'var(--cy-text-tertiary)' }}>
              H2 — Poppins 700 — 28 / 32 / 36px, line-height 1.1
            </code>
          </div>
          <div>
            <div
              className="text-[20px] sm:text-[22px] lg:text-[24px]"
              style={{
                fontFamily: 'var(--cy-font-heading)',
                fontWeight: 600,
                lineHeight: 1.2,
                color: 'var(--cy-text-primary)',
              }}
            >
              Sub-section Title
            </div>
            <code style={{ fontSize: 11, color: 'var(--cy-text-tertiary)' }}>
              H3 — Poppins 600 — 20 / 22 / 24px, line-height 1.2
            </code>
          </div>
          <div>
            <div
              className="text-[16px] sm:text-[17px] lg:text-[18px]"
              style={{
                fontFamily: 'var(--cy-font-heading)',
                fontWeight: 600,
                lineHeight: 1.3,
                color: 'var(--cy-text-primary)',
              }}
            >
              Block Title
            </div>
            <code style={{ fontSize: 11, color: 'var(--cy-text-tertiary)' }}>
              H4 — Poppins 600 — 16 / 17 / 18px, line-height 1.3
            </code>
          </div>
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Breakpoints typo"
      description="Trois paliers fixes alignés sur les breakpoints Tailwind. Pas de clamp(), pas d'interpolation fluide."
    >
      <DocBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <code style={{ fontSize: 12, color: 'var(--cy-text-primary)', minWidth: 90 }}>Mobile</code>
            <span style={{ fontSize: 13, color: 'var(--cy-text-secondary)' }}>
              &lt;640px <span style={{ color: 'var(--cy-text-tertiary)' }}>(Tailwind &lt; <code>sm</code>)</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <code style={{ fontSize: 12, color: 'var(--cy-text-primary)', minWidth: 90 }}>Tablet</code>
            <span style={{ fontSize: 13, color: 'var(--cy-text-secondary)' }}>
              640px – 1024px <span style={{ color: 'var(--cy-text-tertiary)' }}>(Tailwind <code>sm</code> à <code>lg</code>)</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <code style={{ fontSize: 12, color: 'var(--cy-text-primary)', minWidth: 90 }}>Desktop</code>
            <span style={{ fontSize: 13, color: 'var(--cy-text-secondary)' }}>
              ≥1024px <span style={{ color: 'var(--cy-text-tertiary)' }}>(Tailwind <code>lg</code> et au-delà)</span>
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--cy-text-secondary)', marginTop: 8, lineHeight: 1.5 }}>
            Les valeurs desktop sont la référence canonique du DS. Mobile et tablet sont des paliers fixes — pas de <code>clamp()</code>, pas d'interpolation fluide. Un projet qui consomme le DS doit appliquer ces trois paliers via media queries ou variantes Tailwind (<code>text-[36px] sm:text-[44px] lg:text-[56px]</code>).
          </p>
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection title="Tailles de texte" description="Échelle utilisée pour le corps et l'UI.">
      <DocBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SizeRow size={12} label="text-xs" usage="Labels, badges, captions" />
          <SizeRow size={14} label="text-sm" usage="UI dense, sidebar, form labels" />
          <SizeRow size={16} label="text-base" usage="Body par défaut" />
          <SizeRow size={18} label="text-lg" usage="Lead paragraphs, sub-headings" />
          <SizeRow size={20} label="text-xl" usage="Featured copy" />
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection title="Couleurs de texte" description="Quatre tokens de couleur de texte. Toujours via variables.">
      <DocBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <TextColorRow color="var(--cy-text-primary)" name="text-primary" usage="Titres, contenu principal" />
          <TextColorRow
            color="var(--cy-text-secondary)"
            name="text-secondary"
            usage="Descriptions, paragraphes secondaires"
          />
          <TextColorRow
            color="var(--cy-text-tertiary)"
            name="text-tertiary"
            usage="Captions, hints, labels discrets"
          />
          <TextColorRow color="var(--cy-text-accent)" name="text-accent" usage="Liens, accents Cyrano" />
        </div>
      </DocBlock>
    </DocSubSection>
  </DocSection>
);

const SizeRow: React.FC<{ size: number; label: string; usage: string }> = ({ size, label, usage }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
    <span
      style={{
        fontSize: size,
        color: 'var(--cy-text-primary)',
        fontFamily: 'var(--cy-font-body)',
        minWidth: 200,
      }}
    >
      Aa — {size}px
    </span>
    <code style={{ fontSize: 11, color: 'var(--cy-green-400)' }}>{label}</code>
    <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)' }}>{usage}</span>
  </div>
);

const TextColorRow: React.FC<{ color: string; name: string; usage: string }> = ({ color, name, usage }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <span style={{ color, fontSize: 'var(--cy-text-base)', fontWeight: 500, minWidth: 220 }}>
      Le renard agile saute
    </span>
    <code style={{ fontSize: 11, color: 'var(--cy-green-400)' }}>{name}</code>
    <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)' }}>{usage}</span>
  </div>
);

/* ============================================================
   BOUTONS
   ============================================================ */

const ButtonsSection: React.FC = () => (
  <DocSection id="buttons" title="Boutons">
    <p
      style={{
        fontFamily: 'var(--cy-font-body)',
        fontSize: 'var(--cy-text-sm)',
        color: 'var(--cy-text-secondary)',
        lineHeight: 1.7,
        marginBottom: 24,
        maxWidth: 680,
      }}
    >
      Deux familles de boutons. Le bouton animé pour les CTAs signature (un par vue),
      le bouton standard pour le reste, décliné en cinq variantes.
    </p>

    <h3
      style={{
        fontFamily: 'var(--cy-font-heading)',
        fontWeight: 600,
        fontSize: 'var(--cy-text-xl)',
        color: 'var(--cy-text-primary)',
        marginTop: 24,
        marginBottom: 16,
      }}
    >
      Boutons animés
    </h3>

    <DocSubSection
      title="CyAnimatedButton"
      description="Bouton signature pour les CTAs majeurs. Bordure verte qui tourne en idle, glow uniforme au hover. Disponible en 3 tailles. À utiliser avec parcimonie — un seul par vue."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <CyAnimatedButton size="lg">Large</CyAnimatedButton>
          <CyAnimatedButton size="md">Medium</CyAnimatedButton>
          <CyAnimatedButton size="sm">Small</CyAnimatedButton>
        </div>
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`<CyAnimatedButton size="lg">Large</CyAnimatedButton>
<CyAnimatedButton size="md">Medium</CyAnimatedButton>
<CyAnimatedButton size="sm">Small</CyAnimatedButton>`}
      />
    </DocSubSection>

    <h3
      style={{
        fontFamily: 'var(--cy-font-heading)',
        fontWeight: 600,
        fontSize: 'var(--cy-text-xl)',
        color: 'var(--cy-text-primary)',
        marginTop: 64,
        marginBottom: 16,
      }}
    >
      Boutons standards
    </h3>

    <DocSubSection
      title="Bouton principal"
      description="L'action principale d'une vue. Dégradé vert, texte deep-950, shadow vert. Toujours rounded-full. Effet shine en diagonale au hover."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <CyButton size="lg">Large</CyButton>
          <CyButton size="md">Medium</CyButton>
          <CyButton size="sm">Small</CyButton>
        </div>
      </DocBlock>
      <CodeBlock lang="tsx" code={`<CyButton>Bouton Principal</CyButton>`} />
    </DocSubSection>

    <DocSubSection
      title="Bouton avec icône"
      description="Variante du bouton principal avec une icône à gauche du texte. Partage le rounded du CyAnimatedButton (xl) au lieu du pill, pour différencier visuellement."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <CyButton variant="icon" size="lg" icon={<Download size={20} strokeWidth={2.2} />}>
            Télécharger
          </CyButton>
          <CyButton variant="icon" icon={<Download size={18} strokeWidth={2.2} />}>
            Télécharger
          </CyButton>
          <CyButton variant="icon" size="sm" icon={<Download size={14} strokeWidth={2.2} />}>
            Télécharger
          </CyButton>
        </div>
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`import { Download } from 'lucide-react';

<CyButton variant="icon" icon={<Download size={18} />}>
  Télécharger
</CyButton>`}
      />
    </DocSubSection>

    <DocSubSection title="Bouton outlined" description="Action tertiaire. Bordure verte 2px, fond transparent.">
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <CyButton variant="outlined" size="lg">
            Large
          </CyButton>
          <CyButton variant="outlined">Medium</CyButton>
          <CyButton variant="outlined" size="sm">
            Small
          </CyButton>
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection title="Bouton ghost" description="Action discrète, en ligne avec du texte. Texte vert, fond transparent, bg green-500/10 au hover.">
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <CyButton variant="ghost" size="lg">
            Large
          </CyButton>
          <CyButton variant="ghost">Medium</CyButton>
          <CyButton variant="ghost" size="sm">
            Small
          </CyButton>
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Bouton désactivé"
      description="État disabled du bouton principal. Opacity 50 %, dégradé gris, cursor not-allowed."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <CyButton size="lg" disabled>
            Désactivé
          </CyButton>
          <CyButton disabled>Désactivé</CyButton>
          <CyButton size="sm" disabled>
            Désactivé
          </CyButton>
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Link pill"
      description="Mini-CTA secondaire glassmorphic pour les liens contextuels (sources, citations, lectures complémentaires). Pas un CTA primaire : si l'action est centrale, utilise CyButton."
    >
      <DocBlock>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <CyLinkPill href="#" icon={<ArrowUpRight size={12} />}>
            Lire l'article
          </CyLinkPill>
          <CyLinkPill href="https://ycombinator.com" external icon={<ArrowUpRight size={12} />}>
            Source
          </CyLinkPill>
          <CyLinkPill href="#" icon={<ArrowRight size={12} />}>
            En savoir plus
          </CyLinkPill>
        </div>
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`<CyLinkPill href="https://..." external icon={<ArrowUpRight size={12} />}>
  Lire l'article
</CyLinkPill>`}
      />
    </DocSubSection>

    <RulesBox variant="good" title="Bonnes pratiques">
      <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li>Un seul bouton principal (ou avec icône) par vue.</li>
        <li>Rounded-full par défaut. Exception : bouton avec icône en rounded-xl.</li>
        <li>Hover : scale 1.03 + dégradé intensifié, plus shine sur principal et icône.</li>
        <li>Active : scale 0.97.</li>
        <li>Disabled : opacity 50 % + dégradé gris.</li>
        <li>Texte du bouton principal en deep-950 sur le vert.</li>
        <li>CyLinkPill : pour liens secondaires/contextuels uniquement (jamais pour CTA primaire).</li>
      </ul>
    </RulesBox>
  </DocSection>
);

/* ============================================================
   ANIMATIONS
   ============================================================ */

const AnimationsSection: React.FC = () => (
  <DocSection id="animations" title="Animations">
    <DocSubSection
      title="Rotating border"
      description="Animation utilisée par CyAnimatedButton. @property --angle + conic-gradient. Idle : la bordure verte tourne. Hover : glow uniforme."
    >
      <DocBlock>
        <CyAnimatedButton size="lg">Réserver un audit</CyAnimatedButton>
      </DocBlock>
      <CodeBlock
        lang="css"
        code={`@property --cy-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.cy-animated__rotating-stroke {
  background: conic-gradient(
    from var(--cy-angle),
    transparent 0deg,
    transparent 270deg,
    var(--cy-stroke-color) 340deg,
    transparent 360deg
  );
  animation: cy-rotate 4s linear infinite;
}

@keyframes cy-rotate { to { --cy-angle: 360deg; } }`}
      />
    </DocSubSection>

    <DocSubSection
      title="Hover transitions"
      description="Standardisées sur 250ms. Le hover doit toujours signaler clairement l'interactivité sans distraire."
    >
      <DocBlock>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <CyButton>Survole-moi</CyButton>
          <HoverCard />
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Float ambient (optionnel)"
      description="Pour les backgrounds décoratifs. Lent (10–30s), faible opacity, blur. Jamais sur du contenu."
    >
      <DocBlock>
        <div
          style={{
            position: 'relative',
            height: 120,
            background: 'var(--cy-bg-code)',
            border: '1px solid var(--cy-border-subtle)',
            borderRadius: 'var(--cy-radius-xl)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 20,
              left: 40,
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'var(--cy-green-500)',
              opacity: 0.15,
              filter: 'blur(30px)',
              animation: 'cy-float 14s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 40,
              right: 80,
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'var(--cy-deep-600)',
              opacity: 0.2,
              filter: 'blur(36px)',
              animation: 'cy-float 22s ease-in-out infinite reverse',
            }}
          />
          <style>{`@keyframes cy-float { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-12px) translateX(8px); } }`}</style>
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection title="Transitions standards" description="Les 4 transitions à connaître par cœur.">
      <DocBlock>
        <pre
          style={{
            margin: 0,
            fontFamily: 'ui-monospace, monospace',
            fontSize: 12,
            lineHeight: 2.2,
            color: 'var(--cy-text-secondary)',
          }}
        >
          <span style={{ color: 'var(--cy-green-400)' }}>transition-colors</span>      → couleurs (text, bg, border)
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>transition-transform</span>   → scale, translate
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>transition-all duration-250</span> → cas multi-propriétés
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>ease-out</span>               → courbe par défaut
        </pre>
      </DocBlock>
    </DocSubSection>

    <RulesBox variant="bad" title="Animations interdites">
      <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li>Sparkles ou particules sur les CTAs.</li>
        <li>Magnetic pull sur le curseur.</li>
        <li>Diamond spin, pulse glow agressifs.</li>
        <li>Tout effet "AI magique" qui distrait.</li>
        <li>Fade-in à l'apparition au scroll.</li>
      </ul>
    </RulesBox>
  </DocSection>
);

const HoverCard: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '16px 20px',
        background: 'var(--cy-bg-elevated)',
        border: `1px solid ${hovered ? 'var(--cy-green-500)' : 'var(--cy-border)'}`,
        borderRadius: 'var(--cy-radius-xl)',
        fontSize: 'var(--cy-text-sm)',
        color: 'var(--cy-text-primary)',
        transition: 'border-color var(--cy-transition-base), transform var(--cy-transition-base)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        cursor: 'pointer',
      }}
    >
      Survole cette card
    </div>
  );
};

/* ============================================================
   COMPOSANTS
   ============================================================ */

const ComponentsCoreSection: React.FC = () => {
  return (
    <DocSection id="components-core" title="Composants core">
      <p
        style={{
          fontFamily: 'var(--cy-font-body)',
          fontSize: 'var(--cy-text-sm)',
          color: 'var(--cy-text-secondary)',
          lineHeight: 1.7,
          marginBottom: 24,
          maxWidth: 680,
        }}
      >
        Primitives partagées par toutes les surfaces (apps, landings, outils internes).
        Toujours réutiliser un composant core avant d'en créer un nouveau dans <code>app/</code>.
      </p>
      <DocSubSection
        title="Cards"
        description="Deux variantes. Standard pour le contenu courant. Featured pour les éléments mis en avant."
      >
        <div style={grid(2, 16)}>
          <CyCard
            tags={['Cold email', 'B2B']}
            title="Audit déliverabilité"
            description="On analyse vos domaines, votre warm-up et vos séquences. Rapport en 48h."
            action={<CyButton size="sm">En savoir plus</CyButton>}
          />
          <CyCard
            featured
            tags={['Discovery']}
            title="Programme Discovery"
            description="3 mois pour valider un nouveau marché. Process complet, learnings garantis."
            action={<CyButton size="sm">Demander une démo</CyButton>}
          />
        </div>
      </DocSubSection>

      <DocSubSection title="Badges & Tags" description="Six variantes pour les états et catégorisations.">
        <DocBlock>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <CyBadge variant="default">Tag standard</CyBadge>
            <CyBadge variant="outlined">Tag outlined</CyBadge>
            <CyBadge variant="featured">FEATURED</CyBadge>
            <CyBadge variant="success">Succès</CyBadge>
            <CyBadge variant="error">Erreur</CyBadge>
            <CyBadge variant="warning">Attention</CyBadge>
          </div>
        </DocBlock>
      </DocSubSection>

      <DocSubSection
        title="Inputs & Formulaires"
        description="Inputs et textareas en rounded-lg (8px). Focus en vert avec ring 3px."
      >
        <DocBlock>
          <FormDemo />
        </DocBlock>
      </DocSubSection>

      <DocSubSection title="Messages de statut" description="Quatre alertes pour les retours utilisateur.">
        <DocBlock>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CyStatus type="success" title="Campagne envoyée" message="372 emails partis sur les 12 dernières minutes." />
            <CyStatus type="error" title="Domaine non vérifié" message="Le SPF n'est pas encore propagé sur acme.com." />
            <CyStatus type="warning" title="Bounce rate élevé" message="3,8 % sur les 24 dernières heures. À surveiller." />
            <CyStatus type="info" title="Nouvelle séquence active" message="La séquence Q2-Discovery tourne depuis ce matin." />
          </div>
        </DocBlock>
      </DocSubSection>

      <DocSubSection title="Spinner / Loading" description="Cercle Lucide LoaderCircle + animate-spin. Couleur héritée de currentColor (vert Cyrano par défaut, surchargeable via className).">
        <DocBlock>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <CySpinner />
          </div>
        </DocBlock>
      </DocSubSection>

      <DocSubSection
        title="Menu toggle"
        description="Bouton hamburger animé. 3 traits qui se transforment en croix au open. Utilisé pour ouvrir/fermer le menu mobile sur le site, ou un panneau latéral dans une app."
      >
        <DocBlock>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <CyMenuToggle />
            <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-tertiary)' }}>
              Clique pour voir l'animation
            </span>
          </div>
        </DocBlock>
        <CodeBlock
          lang="tsx"
          code={`<CyMenuToggle onChange={(open) => setMenuOpen(open)} />`}
        />
      </DocSubSection>

      <DocSubSection
        title="Background shader"
        description="Background animé décoratif (Warp shader). Deux presets — brand (vert lumineux) et muted (sombre/discret) — × trois intensités — low / medium / high. Toujours sur un parent en position: relative. Un seul intensity='high' par page."
      >
        <DocBlock>
          <div style={grid(2, 16)}>
            <ShaderDemo preset="brand" intensity="medium" label="brand · medium" />
            <ShaderDemo preset="muted" intensity="medium" label="muted · medium" />
            <ShaderDemo preset="brand" intensity="low" label="brand · low" />
            <ShaderDemo preset="brand" intensity="high" label="brand · high" />
          </div>
        </DocBlock>
        <CodeBlock
          lang="tsx"
          code={`<div className="relative overflow-hidden rounded-3xl">
  <CyShaderBg preset="brand" intensity="medium" />
  <div className="relative z-10 p-12 text-white">
    <h2>Démarrer maintenant</h2>
    <CyAnimatedButton size="lg" href="/signup">Lancer</CyAnimatedButton>
  </div>
</div>`}
        />
      </DocSubSection>

      <DocSubSection
        title="Live dot"
        description="Point animé pulse pour eyebrows, badges 'live', status indicators. 2.4s opacity 1 → 0.45 → 1. Respect de prefers-reduced-motion."
      >
        <DocBlock>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <CyLiveDot />
              <span style={{ fontSize: 'var(--cy-text-xs)', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cy-green-400)' }}>L'agence IA</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <CyLiveDot size={8} />
              <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)' }}>Campagne en cours</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <CyLiveDot size={6} pulse={false} />
              <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-tertiary)' }}>Statique (pulse=false)</span>
            </span>
          </div>
        </DocBlock>
        <CodeBlock
          lang="tsx"
          code={`<CyLiveDot size={6} color="var(--cy-green-400)" pulse />`}
        />
      </DocSubSection>

      <DocSubSection
        title="Aurora background"
        description="Fond animé pure CSS : 3 blobs verts qui dérivent + grain SVG + vignette. Pour cartes/banners premium. Différent de CyShaderBg (WebGL) : pas de lag GPU, parfait pour les cartes statiques."
      >
        <DocBlock>
          <div style={grid(3, 16)}>
            <AuroraDemo intensity="subtle" label="subtle" />
            <AuroraDemo intensity="medium" label="medium" />
            <AuroraDemo intensity="strong" label="strong" />
          </div>
        </DocBlock>
        <CodeBlock
          lang="tsx"
          code={`<article style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
  <CyAuroraBg intensity="medium" />
  <div style={{ position: 'relative', zIndex: 1 }}>
    {content}
  </div>
</article>`}
        />
      </DocSubSection>

      <DocSubSection
        title="Gradient text"
        description="Helper qui applique le gradient signature Cyrano sur un mot dans un titre. Centralise le pattern background-clip: text réutilisé dans tous les hero/sections premium."
      >
        <DocBlock>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <h2 style={{ fontFamily: 'var(--cy-font-heading)', fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: 'var(--cy-tracking-tight)' }}>
              Votre <CyGradientText>bras droit IA</CyGradientText>, spécialiste B2B.
            </h2>
            <h2 style={{ fontFamily: 'var(--cy-font-heading)', fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: 'var(--cy-tracking-tight)' }}>
              Pourquoi une <CyGradientText>agence IA</CyGradientText> ?
            </h2>
            <p style={{ fontSize: 'var(--cy-text-base)', color: 'var(--cy-text-secondary)', margin: 0 }}>
              Preset disponibles : <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>green</code> (default),{' '}
              <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>green-soft</code>,{' '}
              <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>green-strong</code>.
            </p>
          </div>
        </DocBlock>
        <CodeBlock
          lang="tsx"
          code={`<h1>Votre <CyGradientText>bras droit IA</CyGradientText>.</h1>`}
        />
      </DocSubSection>

      <DocSubSection
        title="Scroll hint"
        description="Chevron-down animé bounce. À placer entre une accroche et le contenu suivant pour signaler 'scrolle / continue'. Décoratif par défaut (aria-hidden)."
      >
        <DocBlock>
          <div style={{ display: 'flex', alignItems: 'center', gap: 48, padding: '20px 0' }}>
            <CyScrollHint />
            <CyScrollHint size={20} color="var(--cy-text-secondary)" />
            <CyScrollHint size={28} bounce={false} />
            <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-tertiary)' }}>
              default · small/secondary · static
            </span>
          </div>
        </DocBlock>
        <CodeBlock
          lang="tsx"
          code={`<CyScrollHint />
<CyScrollHint size={20} color="var(--cy-text-secondary)" />`}
        />
      </DocSubSection>

      <DocSubSection
        title="Reveal on scroll"
        description="Wrapper qui fade-up les enfants à l'entrée du viewport via IntersectionObserver. Stagger via la prop delay (0-5). Respect prefers-reduced-motion."
      >
        <DocBlock>
          <div style={{ padding: 24, borderRadius: 'var(--cy-radius-2xl)', background: 'var(--cy-bg-elevated)', border: '1px solid var(--cy-border)' }}>
            <CyReveal>
              <p style={{ margin: 0, fontSize: 'var(--cy-text-base)', color: 'var(--cy-text-secondary)' }}>
                Titre qui apparaît en premier.
              </p>
            </CyReveal>
            <CyReveal delay={1}>
              <p style={{ marginTop: 12, marginBottom: 0, fontSize: 'var(--cy-text-base)', color: 'var(--cy-text-secondary)' }}>
                Lede qui suit avec un délai de 80ms.
              </p>
            </CyReveal>
            <CyReveal delay={2}>
              <p style={{ marginTop: 12, marginBottom: 0, fontSize: 'var(--cy-text-base)', color: 'var(--cy-text-secondary)' }}>
                Et un 3e élément avec 160ms.
              </p>
            </CyReveal>
          </div>
        </DocBlock>
        <CodeBlock
          lang="tsx"
          code={`<CyReveal>Title</CyReveal>
<CyReveal delay={1}>Lede</CyReveal>
<CyReveal delay={2}>Body</CyReveal>`}
        />
      </DocSubSection>

      <DocSubSection
        title="Roadmap strip"
        description="Strip horizontal de pills numérotées séparées par des flèches. Pour roadmaps, pipelines, parcours utilisateur, étapes d'un process. Desktop : une ligne. Mobile : wrap 3 par ligne."
      >
        <DocBlock>
          <div style={{ padding: '40px 0' }}>
            <CyRoadmapStrip
              steps={[
                { num: '01', label: 'Audit' },
                { num: '02', label: 'Cibles' },
                { num: '03', label: 'Messages' },
                { num: '04', label: 'Campagne' },
                { num: '05', label: 'Optimisation' },
                { num: '06', label: 'Point mensuel' },
              ]}
            />
          </div>
        </DocBlock>
        <CodeBlock
          lang="tsx"
          code={`<CyRoadmapStrip
  steps={[
    { num: '01', label: 'Audit' },
    { num: '02', label: 'Cibles' },
    { num: '03', label: 'Messages' },
  ]}
/>`}
        />
      </DocSubSection>

      <DocSubSection
        title="CTA banner"
        description="Banner CTA section pleine largeur, signature Cyrano. Compose CyAuroraBg + CyGradientText + (optionnel) CyRoadmapStrip + CyButton. À placer entre 2 sections pour relancer l'attention."
      >
        <DocBlock>
          <CyCtaBanner
            eyebrow="La roadmap"
            titleBefore="Comment ça se passe "
            titleAccent="concrètement"
            titleAfter=" ?"
            subtitle="Votre roadmap Cyrano en 6 étapes, de la première campagne jusqu'au point stratégique mensuel."
            steps={[
              { num: '01', label: 'Audit' },
              { num: '02', label: 'Cibles' },
              { num: '03', label: 'Messages' },
              { num: '04', label: 'Campagne' },
              { num: '05', label: 'Optimisation' },
              { num: '06', label: 'Point mensuel' },
            ]}
            buttonLabel="Découvrir"
            href="#"
            buttonIcon={<ArrowRight size={16} />}
          />
        </DocBlock>
        <CodeBlock
          lang="tsx"
          code={`<CyCtaBanner
  eyebrow="La roadmap"
  titleBefore="Comment ça se passe "
  titleAccent="concrètement"
  titleAfter=" ?"
  subtitle="Votre roadmap Cyrano en 6 étapes."
  steps={[{ num: '01', label: 'Audit' }, ...]}
  buttonLabel="Découvrir"
  href="/#agence"
/>`}
        />
      </DocSubSection>
    </DocSection>
  );
};

const AuroraDemo: React.FC<{
  intensity: 'subtle' | 'medium' | 'strong';
  label: string;
}> = ({ intensity, label }) => (
  <div
    style={{
      position: 'relative',
      height: 180,
      borderRadius: 'var(--cy-radius-2xl)',
      overflow: 'hidden',
      isolation: 'isolate',
      border: '1px solid rgba(5, 211, 126, 0.4)',
      background: 'var(--cy-deep-950)',
    }}
  >
    <CyAuroraBg intensity={intensity} />
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 16,
      }}
    >
      <code
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 11,
          color: '#fff',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          padding: '6px 10px',
          borderRadius: 'var(--cy-radius-lg)',
        }}
      >
        {label}
      </code>
    </div>
  </div>
);

const ShaderDemo: React.FC<{
  preset: 'brand' | 'muted';
  intensity: 'low' | 'medium' | 'high';
  label: string;
}> = ({ preset, intensity, label }) => (
  <div
    style={{
      position: 'relative',
      height: 180,
      borderRadius: 'var(--cy-radius-2xl)',
      overflow: 'hidden',
      border: '1px solid var(--cy-border)',
    }}
  >
    <CyShaderBg preset={preset} intensity={intensity} />
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 16,
      }}
    >
      <code
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 11,
          color: '#fff',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          padding: '6px 10px',
          borderRadius: 'var(--cy-radius-lg)',
        }}
      >
        {label}
      </code>
    </div>
  </div>
);

const groupHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--cy-font-heading)',
  fontWeight: 700,
  fontSize: '22px',
  letterSpacing: 'var(--cy-tracking-tight)',
  color: 'var(--cy-text-primary)',
  marginTop: 64,
  marginBottom: 16,
};

const ComponentsAppSection: React.FC = () => (
  <DocSection id="components-app" title="Composants app">
    <p
      style={{
        fontFamily: 'var(--cy-font-body)',
        fontSize: 'var(--cy-text-sm)',
        color: 'var(--cy-text-secondary)',
        lineHeight: 1.7,
        marginBottom: 24,
        maxWidth: 680,
      }}
    >
      Couche additive par-dessus core, pour les surfaces interactives qui ont besoin de
      plomberie en plus : dashboards (Cydash, SERGE), outils internes, panneaux d'admin.
      Path : {' '}<code style={{ color: 'var(--cy-green-400)' }}>src/components/app/</code>.
      Un composant app peut importer du core, jamais l'inverse.
    </p>

    {/* ======================================================
        ACTIONS
        ====================================================== */}
    <h3 style={{ ...groupHeadingStyle, marginTop: 32 }}>Actions</h3>

    <DocSubSection
      title="AppButton"
      description="Bouton shadcn standard. 6 variants (default vert plein / destructive rouge / outline / secondary / ghost / link). 4 sizes (sm h-8 / default h-9 / lg h-10 / icon h-9 w-9)."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <AppButton>Default</AppButton>
          <AppButton variant="destructive">Destructive</AppButton>
          <AppButton variant="secondary">Secondary</AppButton>
          <AppButton variant="outline">Outline</AppButton>
          <AppButton variant="ghost">Ghost</AppButton>
          <AppButton variant="link">Link</AppButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
          <AppButton size="sm">Small</AppButton>
          <AppButton size="default">Default</AppButton>
          <AppButton size="lg">Large</AppButton>
        </div>
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`<AppButton>Default</AppButton>
<AppButton variant="primary">Action principale</AppButton>
<AppButton variant="destructive">Supprimer</AppButton>`}
      />
    </DocSubSection>

    <DocSubSection
      title="Counter button"
      description="Variante d'AppButton avec un compteur intégré (badge à droite). Pour les actions qui agrègent un état numérique : messages non lus, notifications, tâches à traiter."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <AppCounterButton count={18} icon={<Mail size={14} strokeWidth={2} />}>
            Messages
          </AppCounterButton>
          <AppCounterButton count={3} size="sm">
            Tâches
          </AppCounterButton>
          <AppCounterButton count="99+" size="lg" icon={<Mail size={16} strokeWidth={2} />}>
            Inbox
          </AppCounterButton>
        </div>
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`<AppCounterButton count={18} icon={<Mail size={14} />}>
  Messages
</AppCounterButton>`}
      />
    </DocSubSection>

    <DocSubSection
      title="DropdownMenu"
      description="Menu contextuel avec drill-down (sub-pages), checkbox/radio items, séparateurs. Pour menus utilisateur, paramètres, actions contextuelles."
    >
      <DocBlock>
        <DropdownMenuDemo />
      </DocBlock>
    </DocSubSection>

    {/* ======================================================
        SAISIE & SÉLECTION
        ====================================================== */}
    <h3 style={groupHeadingStyle}>Saisie &amp; sélection</h3>

    <DocSubSection
      title="Checkbox"
      description="Case à cocher accessible (Radix). Le vert ne s'affiche que sur l'état coché (indicateur de sélection)."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--cy-text-sm)' }}>
            <AppCheckbox defaultChecked /> Coché
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--cy-text-sm)' }}>
            <AppCheckbox /> Non coché
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--cy-text-sm)', opacity: 0.5 }}>
            <AppCheckbox disabled /> Désactivé
          </label>
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Select"
      description="Menu déroulant pour choisir parmi une liste fermée (Radix). Portal, keyboard nav, scrollable, groupable."
    >
      <DocBlock>
        <SelectDemo />
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`<AppSelect>
  <AppSelectTrigger className="w-48">
    <AppSelectValue placeholder="Choisir un fuseau" />
  </AppSelectTrigger>
  <AppSelectContent>
    <AppSelectItem value="utc">UTC</AppSelectItem>
    <AppSelectItem value="cet">Europe/Paris (CET)</AppSelectItem>
    <AppSelectItem value="est">America/NY (EST)</AppSelectItem>
  </AppSelectContent>
</AppSelect>`}
      />
    </DocSubSection>

    <DocSubSection
      title="Toggle"
      description="Interrupteur on/off avec animation spring. Le vert signale l'état ON actif (identité du composant)."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <AppToggle />
          <AppToggle defaultChecked />
          <AppToggle showLabels={false} />
          <AppToggle disabled />
        </div>
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`<AppToggle defaultChecked onChange={(checked) => setEnabled(checked)} />`}
      />
    </DocSubSection>

    <DocSubSection
      title="EditableChip"
      description="Chip avec édition inline + double confirmation visuelle (icône stylo → check). Le clic sur le label ne fait rien — seul le clic sur le stylo passe en édition. Pour les propriétés modifiées rarement nécessitant une confirmation explicite."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <AppEditableChip defaultLabel="Watchlist" />
          <AppEditableChip defaultLabel="Favoris" />
        </div>
      </DocBlock>
    </DocSubSection>

    {/* ======================================================
        NAVIGATION
        ====================================================== */}
    <h3 style={groupHeadingStyle}>Navigation</h3>

    <DocSubSection
      title="Tabs"
      description="Navigation entre vues d'une même page (Radix). Variant default (segmented avec ombre sur l'onglet actif) ou underline (sobre, trait sous l'onglet actif)."
    >
      <DocBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <AppTabs defaultValue="tab-1">
            <AppTabsList>
              <AppTabsTab value="tab-1">Aperçu</AppTabsTab>
              <AppTabsTab value="tab-2">Métriques</AppTabsTab>
              <AppTabsTab value="tab-3">Logs</AppTabsTab>
            </AppTabsList>
            <AppTabsPanel value="tab-1">
              <p style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)', padding: 12 }}>
                Contenu de l'onglet Aperçu
              </p>
            </AppTabsPanel>
            <AppTabsPanel value="tab-2">
              <p style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)', padding: 12 }}>
                Contenu de l'onglet Métriques
              </p>
            </AppTabsPanel>
            <AppTabsPanel value="tab-3">
              <p style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)', padding: 12 }}>
                Contenu de l'onglet Logs
              </p>
            </AppTabsPanel>
          </AppTabs>
          <AppTabs defaultValue="tab-a" variant="underline">
            <AppTabsList>
              <AppTabsTab value="tab-a">Underline A</AppTabsTab>
              <AppTabsTab value="tab-b">Underline B</AppTabsTab>
              <AppTabsTab value="tab-c">Underline C</AppTabsTab>
            </AppTabsList>
          </AppTabs>
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Pagination"
      description="Wrapper sémantique (nav/ul/li) pour les contrôles de pagination. À combiner avec des AppButton (variant ghost pour les pages non actives, outline pour la page courante)."
    >
      <DocBlock>
        <AppPagination>
          <AppPaginationContent>
            <AppPaginationItem>
              <AppButton variant="ghost" className="gap-1.5">
                <ChevronLeft size={16} /> Précédent
              </AppButton>
            </AppPaginationItem>
            <AppPaginationItem>
              <AppButton variant="ghost" size="icon">1</AppButton>
            </AppPaginationItem>
            <AppPaginationItem>
              <AppButton variant="outline" size="icon">2</AppButton>
            </AppPaginationItem>
            <AppPaginationItem>
              <AppButton variant="ghost" size="icon">3</AppButton>
            </AppPaginationItem>
            <AppPaginationItem>
              <AppPaginationEllipsis />
            </AppPaginationItem>
            <AppPaginationItem>
              <AppButton variant="ghost" className="gap-1.5">
                Suivant <ChevronRight size={16} />
              </AppButton>
            </AppPaginationItem>
          </AppPaginationContent>
        </AppPagination>
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`import { ChevronLeft, ChevronRight } from 'lucide-react';

<AppPagination>
  <AppPaginationContent>
    <AppPaginationItem>
      <AppButton variant="ghost"><ChevronLeft /> Précédent</AppButton>
    </AppPaginationItem>
    <AppPaginationItem>
      <AppButton variant="outline" size="icon">2</AppButton>
    </AppPaginationItem>
    <AppPaginationItem>
      <AppPaginationEllipsis />
    </AppPaginationItem>
    <AppPaginationItem>
      <AppButton variant="ghost">Suivant <ChevronRight /></AppButton>
    </AppPaginationItem>
  </AppPaginationContent>
</AppPagination>`}
      />
    </DocSubSection>

    <DocSubSection
      title="DataTable"
      description="Table de données générique avec colonnes configurables (label + render custom), animation row-by-row au montage, message vide. Compose avec CyBadge pour les status, AppAvatar pour les utilisateurs."
    >
      <DocBlock>
        <DataTableDemo />
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`type Lead = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'lost';
};

const columns: ColumnDef<Lead>[] = [
  { key: 'name', label: 'Nom' },
  { key: 'email', label: 'Email' },
  {
    key: 'status',
    label: 'Statut',
    render: (row) => (
      <CyBadge variant={row.status === 'active' ? 'success' : 'warning'}>
        {row.status}
      </CyBadge>
    ),
  },
];

<AppDataTable data={leads} columns={columns} />`}
      />
    </DocSubSection>

    <DocSubSection
      title="Avatar"
      description="Avatar Radix avec fallback (initiales si l'image ne charge pas). Utilisé seul ou empilé dans une colonne DataTable."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <AppAvatar>
            <AppAvatarImage src="https://i.pravatar.cc/80?u=louis" alt="Louis" />
            <AppAvatarFallback>LO</AppAvatarFallback>
          </AppAvatar>
          <AppAvatar>
            <AppAvatarImage src="https://i.pravatar.cc/80?u=pierre" alt="Pierre" />
            <AppAvatarFallback>PF</AppAvatarFallback>
          </AppAvatar>
          <AppAvatar>
            <AppAvatarImage src="" alt="" />
            <AppAvatarFallback>JD</AppAvatarFallback>
          </AppAvatar>
          <div className="flex -space-x-2">
            <AppAvatar className="border-2 border-background">
              <AppAvatarImage src="https://i.pravatar.cc/80?u=a" alt="A" />
              <AppAvatarFallback>A</AppAvatarFallback>
            </AppAvatar>
            <AppAvatar className="border-2 border-background">
              <AppAvatarImage src="https://i.pravatar.cc/80?u=b" alt="B" />
              <AppAvatarFallback>B</AppAvatarFallback>
            </AppAvatar>
            <AppAvatar className="border-2 border-background">
              <AppAvatarImage src="" alt="" />
              <AppAvatarFallback>+3</AppAvatarFallback>
            </AppAvatar>
          </div>
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Sidebar nav"
      description="Shell générique : rail icon à gauche + panel détail collapsible à droite. Données (sections, items, sub-items) passées en props — pas de hardcoded. Toujours en thème sombre forcé. Idéal pour Cydash, SERGE, panneaux d'admin."
    >
      <DocBlock>
        <SidebarDemo />
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`<AppSidebar
  rail={[{ id: 'dashboard', icon: <LayoutDashboard />, label: 'Dashboard' }, ...]}
  activeId="dashboard"
  onNavChange={setActiveId}
  panelTitle="Dashboard"
  sections={[{ title: 'Vues', items: [...] }]}
/>`}
      />
    </DocSubSection>

    {/* ======================================================
        FEEDBACK
        ====================================================== */}
    <h3 style={groupHeadingStyle}>Feedback</h3>

    <DocSubSection
      title="Skeleton"
      description="Placeholder de chargement minimaliste. Un <div> avec animate-pulse + bg-muted. Les dimensions et la forme passent par className — pas de variants. Le user compose les patterns (avatar, ligne de texte, card)."
    >
      <DocBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Avatar + 2 lignes
            </div>
            <div className="flex items-center gap-3">
              <AppSkeleton className="h-10 w-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <AppSkeleton className="h-4 w-32" />
                <AppSkeleton className="h-3 w-48" />
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Row de DataTable
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg border border-border">
              <AppSkeleton className="h-4 w-32" />
              <AppSkeleton className="h-4 w-48" />
              <AppSkeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Card avec image
            </div>
            <div className="rounded-lg border border-border p-4 flex flex-col gap-3 max-w-sm">
              <AppSkeleton className="h-32 w-full" />
              <AppSkeleton className="h-5 w-3/4" />
              <AppSkeleton className="h-4 w-full" />
              <AppSkeleton className="h-4 w-5/6" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-text-tertiary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Block paragraphe
            </div>
            <div className="flex flex-col gap-2 max-w-md">
              <AppSkeleton className="h-3 w-full" />
              <AppSkeleton className="h-3 w-full" />
              <AppSkeleton className="h-3 w-3/4" />
            </div>
          </div>
        </div>
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`// Avatar
<AppSkeleton className="h-10 w-10 rounded-full" />

// Ligne de texte
<AppSkeleton className="h-4 w-32" />

// Bloc image
<AppSkeleton className="h-32 w-full" />`}
      />
    </DocSubSection>

    {/* ======================================================
        OVERLAYS
        ====================================================== */}
    <h3 style={groupHeadingStyle}>Overlays</h3>

    <DocSubSection
      title="Tooltip"
      description="Tooltip basé sur Radix UI : positionnement intelligent, focus géré, animations subtiles. Fond inversé (text-primary) pour contraster avec n'importe quel arrière-plan."
    >
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <CyButton variant="outlined" size="sm">Top</CyButton>
            </TooltipTrigger>
            <TooltipContent side="top">Tooltip en haut</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <CyButton variant="outlined" size="sm">Right</CyButton>
            </TooltipTrigger>
            <TooltipContent side="right">Tooltip à droite</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <CyButton variant="outlined" size="sm">Bottom</CyButton>
            </TooltipTrigger>
            <TooltipContent side="bottom">Tooltip en bas</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <CyButton variant="outlined" size="sm">Left</CyButton>
            </TooltipTrigger>
            <TooltipContent side="left">Tooltip à gauche</TooltipContent>
          </Tooltip>
        </div>
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`<Tooltip>
  <TooltipTrigger asChild>
    <CyButton>Hover me</CyButton>
  </TooltipTrigger>
  <TooltipContent side="right">
    Ajouter à la bibliothèque
  </TooltipContent>
</Tooltip>`}
      />
    </DocSubSection>

    <DocSubSection
      title="Dialog"
      description="Modal Radix avec header (bg muted + close X), body, footer (bg muted + boutons). Pour formulaires d'édition rapide, confirmations, dialogues de saisie. Backdrop blur au-dessus du contenu."
    >
      <DocBlock>
        <DialogDemo />
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`<AppDialog>
  <AppDialogTrigger asChild>
    <AppButton variant="outline">Modifier</AppButton>
  </AppDialogTrigger>
  <AppDialogContent>
    <AppDialogHeader>
      <AppDialogTitle>Modifier le profil</AppDialogTitle>
      <AppDialogDescription>Met à jour ton nom.</AppDialogDescription>
    </AppDialogHeader>
    <AppDialogBody>
      <CyInput label="Nom" defaultValue="Louis Orliange" />
    </AppDialogBody>
    <AppDialogFooter>
      <AppDialogClose asChild>
        <AppButton variant="outline">Annuler</AppButton>
      </AppDialogClose>
      <AppButton>Enregistrer</AppButton>
    </AppDialogFooter>
  </AppDialogContent>
</AppDialog>`}
      />
    </DocSubSection>

    <DocSubSection
      title="Toast"
      description="Notifications éphémères en bas-droite de l'écran. Stack accordéon (3 visibles max), pause au hover, auto-dismiss 3s. 4 types : message (neutre), success (vert), warning (amber), error (rouge). Hook useToasts() callable de n'importe où."
    >
      <DocBlock>
        <ToastDemo />
      </DocBlock>
      <CodeBlock
        lang="tsx"
        code={`import { useToasts } from '@/components/app';

const toasts = useToasts();

// Notification simple
toasts.success('Campagne envoyée');
toasts.error('Domaine non vérifié');

// Avec action
toasts.message({
  text: 'Séquence supprimée',
  preserve: true,
  action: 'Annuler',
  onAction: () => restoreSequence(),
});`}
      />
    </DocSubSection>
  </DocSection>
);

/* Démos internes */

type DemoLead = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'lost';
  team: string;
};

const demoLeads: DemoLead[] = [
  { id: '1', name: 'Acme Corp', email: 'contact@acme.com', status: 'active', team: 'Sales' },
  { id: '2', name: 'Globex Industries', email: 'hello@globex.io', status: 'pending', team: 'Discovery' },
  { id: '3', name: 'Initech', email: 'leads@initech.fr', status: 'active', team: 'Sales' },
  { id: '4', name: 'Umbrella Co', email: 'sales@umbrella.com', status: 'lost', team: 'Discovery' },
  { id: '5', name: 'Pied Piper', email: 'team@pp.io', status: 'active', team: 'Sales' },
];

const statusVariant: Record<DemoLead['status'], 'success' | 'warning' | 'error'> = {
  active: 'success',
  pending: 'warning',
  lost: 'error',
};

const DataTableDemo: React.FC = () => {
  const columns: ColumnDef<DemoLead>[] = [
    { key: 'name', label: 'Nom', cellClassName: 'font-medium' },
    { key: 'email', label: 'Email', cellClassName: 'text-muted-foreground' },
    { key: 'team', label: 'Équipe' },
    {
      key: 'status',
      label: 'Statut',
      render: (row) => <CyBadge variant={statusVariant[row.status]}>{row.status}</CyBadge>,
    },
  ];

  return <AppDataTable data={demoLeads} columns={columns} />;
};

const DialogDemo: React.FC = () => {
  return (
    <AppDialog>
      <AppDialogTrigger asChild>
        <AppButton variant="outline">Modifier le profil</AppButton>
      </AppDialogTrigger>
      <AppDialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            (e.currentTarget.closest('[role="dialog"]') as HTMLElement)?.querySelector<HTMLButtonElement>(
              '[data-slot="dialog-close"]',
            )?.click();
          }}
        >
          <AppDialogHeader>
            <AppDialogTitle>Modifier le profil</AppDialogTitle>
            <AppDialogDescription>
              Met à jour ton nom et ton email. Les changements sont visibles immédiatement.
            </AppDialogDescription>
          </AppDialogHeader>
          <AppDialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <CyInput label="Nom" defaultValue="Louis Orliange" />
              <CyInput label="Email" type="email" defaultValue="l.orliange@hellocyrano.com" />
            </div>
          </AppDialogBody>
          <AppDialogFooter>
            <AppDialogClose asChild>
              <AppButton type="button" variant="outline">
                Annuler
              </AppButton>
            </AppDialogClose>
            <AppButton type="submit">Enregistrer</AppButton>
          </AppDialogFooter>
        </form>
      </AppDialogContent>
    </AppDialog>
  );
};

const ToastDemo: React.FC = () => {
  const toasts = useToasts();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <AppButton variant="outline" onClick={() => toasts.message({ text: 'Voici une notification neutre.' })}>
        Message
      </AppButton>
      <AppButton variant="outline" onClick={() => toasts.success('Campagne envoyée. 372 emails partis.')}>
        Success
      </AppButton>
      <AppButton variant="outline" onClick={() => toasts.warning('Bounce rate élevé : 3,8 % sur 24h.')}>
        Warning
      </AppButton>
      <AppButton variant="outline" onClick={() => toasts.error('Domaine acme.com non vérifié.')}>
        Error
      </AppButton>
      <AppButton
        variant="outline"
        onClick={() =>
          toasts.message({
            text: 'Séquence Q2-Discovery supprimée.',
            preserve: true,
            action: 'Annuler',
            onAction: () => toasts.success('Séquence restaurée.'),
          })
        }
      >
        Avec action
      </AppButton>
    </div>
  );
};

const SelectDemo: React.FC = () => {
  const [tz, setTz] = useState('cet');
  return (
    <AppSelect value={tz} onValueChange={setTz}>
      <AppSelectTrigger className="w-56">
        <AppSelectValue placeholder="Choisir un fuseau" />
      </AppSelectTrigger>
      <AppSelectContent>
        <AppSelectGroup>
          <AppSelectLabel>Europe</AppSelectLabel>
          <AppSelectItem value="cet">Paris (CET)</AppSelectItem>
          <AppSelectItem value="utc">UTC</AppSelectItem>
        </AppSelectGroup>
        <AppSelectGroup>
          <AppSelectLabel>Amérique</AppSelectLabel>
          <AppSelectItem value="est">New York (EST)</AppSelectItem>
          <AppSelectItem value="pst">San Francisco (PST)</AppSelectItem>
        </AppSelectGroup>
      </AppSelectContent>
    </AppSelect>
  );
};

const DropdownMenuDemo: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);

  return (
    <AppDropdownMenu>
      <AppDropdownMenuTrigger asChild>
        <AppButton variant="outline">
          Options
          <ChevronDown className="ms-2" size={16} />
        </AppButton>
      </AppDropdownMenuTrigger>
      <AppDropdownMenuContent className="min-w-[16rem]" align="start">
        <AppDropdownMenuPage id="main">
          <AppDropdownMenuLabel>Compte</AppDropdownMenuLabel>
          <AppDropdownMenuItem>
            <User />
            <span>Profil</span>
          </AppDropdownMenuItem>
          <AppDropdownMenuSeparator />
          <AppDropdownMenuPageTrigger targetId="share">
            <Share2 />
            <span>Partager</span>
          </AppDropdownMenuPageTrigger>
          <AppDropdownMenuPageTrigger targetId="prefs">
            <SettingsIcon />
            <span>Préférences</span>
          </AppDropdownMenuPageTrigger>
          <AppDropdownMenuSeparator />
          <AppDropdownMenuItem className="text-destructive focus:bg-destructive/10">
            <LogOut />
            <span>Déconnexion</span>
          </AppDropdownMenuItem>
        </AppDropdownMenuPage>

        <AppDropdownMenuPage id="share">
          <AppDropdownMenuItem>
            <Mail />
            <span>Envoyer par email</span>
          </AppDropdownMenuItem>
          <AppDropdownMenuItem>
            <Share2 />
            <span>Copier le lien</span>
          </AppDropdownMenuItem>
        </AppDropdownMenuPage>

        <AppDropdownMenuPage id="prefs">
          <AppDropdownMenuLabel>Thème</AppDropdownMenuLabel>
          <AppDropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <AppDropdownMenuRadioItem value="light">
              <Sun />
              <span>Light</span>
            </AppDropdownMenuRadioItem>
            <AppDropdownMenuRadioItem value="dark">
              <Moon />
              <span>Dark</span>
            </AppDropdownMenuRadioItem>
          </AppDropdownMenuRadioGroup>
          <AppDropdownMenuSeparator />
          <AppDropdownMenuLabel>Notifications</AppDropdownMenuLabel>
          <AppDropdownMenuCheckboxItem
            checked={notifications}
            onCheckedChange={setNotifications}
            onSelect={(e) => e.preventDefault()}
          >
            <Bell />
            <span>Activer les sons</span>
          </AppDropdownMenuCheckboxItem>
        </AppDropdownMenuPage>
      </AppDropdownMenuContent>
    </AppDropdownMenu>
  );
};

const SidebarDemo: React.FC = () => {
  const [active, setActive] = useState('dashboard');

  const sections: Record<string, { title: string; sections: AppSidebarSection[] }> = {
    dashboard: {
      title: 'Dashboard',
      sections: [
        {
          title: 'Vues',
          items: [
            { icon: <LayoutDashboard size={16} />, label: 'Vue d\'ensemble', isActive: true },
            { icon: <ListChecks size={16} />, label: 'KPIs' },
          ],
        },
        {
          title: 'Rapports',
          items: [
            {
              icon: <Folder size={16} />,
              label: 'Hebdo',
              children: [{ label: 'Productivité' }, { label: 'Budget' }],
            },
          ],
        },
      ],
    },
    tasks: {
      title: 'Tâches',
      sections: [
        {
          title: 'Mes tâches',
          items: [
            { icon: <ListChecks size={16} />, label: 'À faire' },
            { icon: <Calendar size={16} />, label: 'Aujourd\'hui' },
          ],
        },
      ],
    },
    files: {
      title: 'Fichiers',
      sections: [{ title: 'Récents', items: [{ icon: <Folder size={16} />, label: 'Documents' }] }],
    },
  };

  const current = sections[active] || sections.dashboard!;

  return (
    <div style={{ height: 480, display: 'flex' }}>
      <AppSidebar
        rail={[
          { id: 'dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
          { id: 'tasks', icon: <ListChecks size={16} />, label: 'Tâches' },
          { id: 'files', icon: <Folder size={16} />, label: 'Fichiers' },
        ]}
        activeId={active}
        onNavChange={setActive}
        bottomRail={[{ id: 'settings', icon: <SettingsIcon size={16} />, label: 'Paramètres' }]}
        panelTitle={current.title}
        sections={current.sections}
        searchable
      />
    </div>
  );
};

const FormDemo: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}
    >
      <CyInput
        label="Email"
        type="email"
        placeholder="vous@hellocyrano.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        hint="On répond sous 24h ouvrées."
      />
      <CyTextarea
        label="Message"
        placeholder="Décrivez brièvement votre besoin"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
      />
      <div>
        <CyButton type="submit">Envoyer</CyButton>
      </div>
    </form>
  );
};

/* ============================================================
   LAYOUT & SPACING
   ============================================================ */

const LayoutSection: React.FC = () => (
  <DocSection id="layout" title="Layout & Spacing">
    <DocSubSection title="Containers" description="Largeurs maximales standards pour les conteneurs de contenu.">
      <DocBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ContainerRow name="max-w-7xl" px="1280px" usage="Layout principal — page entière" />
          <ContainerRow name="max-w-5xl" px="1024px" usage="Articles, sections de contenu long" />
          <ContainerRow name="max-w-4xl" px="896px" usage="Hero, intro de page" />
          <ContainerRow name="max-w-2xl" px="672px" usage="Formulaires, texte dense" />
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Structure de layout typique"
      description="Trois patterns récurrents qui couvrent 90 % des cas. À copier-coller tel quel."
    >
      <CodeBlock
        lang="tsx"
        code={`// Layout global (page entière)
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Contenu */}
</div>

// Section hero (intro, landing)
<section className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto text-center">
    <h1>Titre</h1>
    <p>Description</p>
  </div>
</section>

// Formulaire
<div className="max-w-2xl mx-auto">
  <form>
    {/* Champs */}
  </form>
</div>`}
      />
    </DocSubSection>

    <DocSubSection
      title="Padding"
      description="Padding horizontal responsive (mobile → desktop) et padding vertical de section. À utiliser systématiquement, pas de valeurs arbitraires."
    >
      <DocBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <PaddingRow
            label="px-4 sm:px-6 lg:px-8"
            usage="Padding horizontal responsive standard"
            steps={[16, 24, 32]}
            stepLabels={['mobile', 'sm: ≥640', 'lg: ≥1024']}
          />
          <PaddingRow
            label="py-12"
            usage="Section padding vertical (48px)"
            steps={[48]}
            vertical
          />
          <PaddingRow
            label="py-20"
            usage="Section padding vertical large (80px)"
            steps={[80]}
            vertical
          />
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Spacing"
      description="Espacement entre éléments avec une échelle cohérente. space-x-* en ligne, gap-* en grid/flex."
    >
      <DocBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <SpacingDemo label="space-x-2" usage="Petits éléments (8px)" gap={8} count={3} />
          <SpacingDemo label="space-x-4" usage="Éléments moyens (16px)" gap={16} count={3} />
          <SpacingDemo label="space-x-8" usage="Grands éléments (32px)" gap={32} count={3} />
          <SpacingDemo label="gap-6" usage="Grid spacing (24px)" gap={24} count={3} wide />
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Border radius"
      description="Six valeurs canoniques. Pas de radius arbitraire."
    >
      <DocBlock>
        <div style={grid(6, 10)}>
          <RadiusCard radius={4} name="rounded-sm" usage="Inputs internes" />
          <RadiusCard radius={8} name="rounded-lg" usage="Sidebar, swatches" />
          <RadiusCard radius={12} name="rounded-xl" usage="Cards, DocBlock" />
          <RadiusCard radius={16} name="rounded-2xl" usage="Textareas" />
          <RadiusCard radius={24} name="rounded-3xl" usage="Modals, overlays" />
          <RadiusCard radius={9999} name="rounded-full" usage="Boutons, badges" />
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Grid System"
      description="Grilles responsive avec breakpoints standards. Deux patterns à copier-coller."
    >
      <DocBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <GridDemo
            label="2 colonnes mobile, 4 sur desktop"
            cols={4}
            gap={16}
            code="grid grid-cols-2 md:grid-cols-4 gap-4"
          />
          <GridDemo
            label="1 colonne mobile, 2 tablette, 3 desktop"
            cols={3}
            gap={24}
            code="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          />
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection title="Breakpoints" description="Les 5 breakpoints Tailwind utilisés par Cyrano.">
      <DocBlock>
        <pre
          style={{
            margin: 0,
            fontFamily: 'ui-monospace, monospace',
            fontSize: 12,
            lineHeight: 2,
            color: 'var(--cy-text-secondary)',
          }}
        >
          <span style={{ color: 'var(--cy-green-400)' }}>sm</span>:  640px   — mobile large, petites tablettes
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>md</span>:  768px   — tablettes
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>lg</span>:  1024px  — petits desktops
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>xl</span>:  1280px  — grands desktops
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>2xl</span>: 1536px  — très grands écrans
        </pre>
      </DocBlock>
    </DocSubSection>
  </DocSection>
);

const ContainerRow: React.FC<{ name: string; px: string; usage: string }> = ({ name, px, usage }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <code
      style={{
        fontSize: 11,
        color: 'var(--cy-green-400)',
        background: 'var(--cy-bg-code)',
        padding: '4px 10px',
        borderRadius: 'var(--cy-radius-lg)',
        minWidth: 120,
      }}
    >
      {name}
    </code>
    <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-primary)', minWidth: 90 }}>{px}</span>
    <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)' }}>{usage}</span>
  </div>
);

const PaddingRow: React.FC<{
  label: string;
  usage: string;
  steps: number[];
  stepLabels?: string[];
  vertical?: boolean;
}> = ({ label, usage, steps, stepLabels, vertical = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <code
        style={{
          fontSize: 11,
          color: 'var(--cy-green-400)',
          background: 'var(--cy-bg-code)',
          padding: '4px 10px',
          borderRadius: 'var(--cy-radius-lg)',
        }}
      >
        {label}
      </code>
      <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)' }}>{usage}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, paddingTop: 4 }}>
      {steps.map((px, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
          <div
            style={{
              height: vertical ? px : 12,
              width: vertical ? 60 : px,
              background: 'var(--cy-green-500)',
              borderRadius: 'var(--cy-radius-sm)',
            }}
          />
          <span style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-text-tertiary)' }}>
            {stepLabels?.[i] ? `${stepLabels[i]} · ${px}px` : `${px}px`}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const SpacingDemo: React.FC<{
  label: string;
  usage: string;
  gap: number;
  count: number;
  wide?: boolean;
}> = ({ label, usage, gap, count, wide = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <code
        style={{
          fontSize: 11,
          color: 'var(--cy-green-400)',
          background: 'var(--cy-bg-code)',
          padding: '4px 10px',
          borderRadius: 'var(--cy-radius-lg)',
        }}
      >
        {label}
      </code>
      <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)' }}>{usage}</span>
    </div>
    <div style={{ display: 'flex', gap, alignItems: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: wide ? 120 : 28,
            height: 28,
            background: 'var(--cy-green-500)',
            borderRadius: 'var(--cy-radius-sm)',
          }}
        />
      ))}
    </div>
  </div>
);

const GridDemo: React.FC<{ label: string; cols: number; gap: number; code: string }> = ({
  label,
  cols,
  gap,
  code,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <span style={{ fontSize: 'var(--cy-text-sm)', color: 'var(--cy-text-secondary)' }}>{label}</span>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap,
      }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 56,
            background: 'var(--cy-green-500)',
            borderRadius: 'var(--cy-radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--cy-deep-950)',
            fontFamily: 'var(--cy-font-heading)',
            fontWeight: 700,
            fontSize: 'var(--cy-text-base)',
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
    <code
      style={{
        fontSize: 11,
        color: 'var(--cy-green-400)',
        background: 'var(--cy-bg-code)',
        padding: '6px 10px',
        borderRadius: 'var(--cy-radius-lg)',
        fontFamily: 'ui-monospace, monospace',
        alignSelf: 'flex-start',
      }}
    >
      {code}
    </code>
  </div>
);

const RadiusCard: React.FC<{ radius: number; name: string; usage: string }> = ({ radius, name, usage }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
    <div
      style={{
        height: 60,
        width: '100%',
        background: 'var(--cy-green-500)',
        borderRadius: radius,
      }}
    />
    <code style={{ fontSize: 11, color: 'var(--cy-green-400)' }}>{name}</code>
    <span style={{ fontSize: 'var(--cy-text-xs)', color: 'var(--cy-text-secondary)', textAlign: 'center' }}>
      {usage}
    </span>
  </div>
);

/* ============================================================
   INTERACTIONS
   ============================================================ */

const InteractionsSection: React.FC = () => (
  <DocSection id="interactions" title="Interactions">
    <DocSubSection title="États hover" description="Tout élément interactif doit signaler son état au survol.">
      <DocBlock>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <CyButton>Survole-moi</CyButton>
          <HoverCard />
        </div>
      </DocBlock>
    </DocSubSection>

    <DocSubSection
      title="Focus (a11y)"
      description="Toujours visible pour la nav clavier. Ring vert 2px, offset 2px par défaut."
    >
      <DocBlock>
        <CyInput label="Tabule jusqu'ici" placeholder="Focus visible avec un ring vert" />
      </DocBlock>
    </DocSubSection>

    <DocSubSection title="Transitions" description="Les 6 transitions à utiliser dans le DS.">
      <DocBlock>
        <pre
          style={{
            margin: 0,
            fontFamily: 'ui-monospace, monospace',
            fontSize: 12,
            lineHeight: 2,
            color: 'var(--cy-text-secondary)',
          }}
        >
          <span style={{ color: 'var(--cy-green-400)' }}>transition-colors</span>     → couleurs uniquement
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>transition-transform</span>  → scale, translate
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>transition-all</span>        → cas multi-propriétés
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>duration-150</span>          → micro-interactions
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>duration-250</span>          → défaut
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>duration-400</span>          → modals, expansions
          {'\n'}
          <span style={{ color: 'var(--cy-green-400)' }}>ease-out</span>              → courbe par défaut
        </pre>
      </DocBlock>
    </DocSubSection>
  </DocSection>
);

/* ============================================================
   Z-INDEX
   ============================================================ */

const ZIndexSection: React.FC = () => (
  <DocSection id="zindex" title="Z-Index">
    <DocSubSection
      title="Échelle stricte"
      description="Toujours utiliser ces valeurs. Jamais de z-index arbitraire."
    >
      <DocBlock>
        <pre
          style={{
            margin: 0,
            fontFamily: 'ui-monospace, monospace',
            fontSize: 13,
            lineHeight: 2.2,
            color: 'var(--cy-text-secondary)',
          }}
        >
          <span style={{ color: 'var(--cy-green-500)' }}>z-0</span>      Background (DynamicBackground, particules)
          {'\n'}
          <span style={{ color: 'var(--cy-green-500)' }}>z-10</span>     Contenu principal
          {'\n'}
          <span style={{ color: 'var(--cy-green-500)' }}>z-50</span>     Header sticky
          {'\n'}
          <span style={{ color: 'var(--cy-green-500)' }}>z-60</span>     Hello bar
          {'\n'}
          <span style={{ color: 'var(--cy-green-500)' }}>z-[100]</span>  Dropdowns
          {'\n'}
          <span style={{ color: 'var(--cy-green-500)' }}>z-[500]</span>  Mobile menu
          {'\n'}
          <span style={{ color: 'var(--cy-green-500)' }}>z-[1000]</span> Modals
          {'\n'}
          <span style={{ color: 'var(--cy-green-500)' }}>z-[9999]</span> Overlays fullscreen
        </pre>
      </DocBlock>
    </DocSubSection>
  </DocSection>
);

/* ============================================================
   BRAND
   ============================================================ */

const BrandSection: React.FC = () => (
  <DocSection id="brand" title="Brand">
    <DocSubSection
      title="Logos"
      description="Le logo Cyrano existe en 2 variantes : long (avec wordmark) et square (symbole seul). Long en priorité, square uniquement quand l'espace ne permet pas."
    >
      <div style={grid(2, 16)}>
        <LogoCard background="var(--cy-deep-950)" variant="long" theme="white" filename="cyrano_long_white.svg" />
        <LogoCard background="#ffffff" variant="long" theme="black" filename="cyrano_long_black.svg" />
        <LogoCard background="var(--cy-deep-950)" variant="square" theme="white" filename="cyrano_square_white.svg" />
        <LogoCard background="#ffffff" variant="square" theme="black" filename="cyrano_square_black.svg" />
      </div>
    </DocSubSection>

    <DocSubSection title="Règles d'usage" description="Ce qui est autorisé et interdit avec le logo.">
      <DocBlock>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            color: 'var(--cy-text-secondary)',
            fontSize: 'var(--cy-text-sm)',
            lineHeight: 1.7,
          }}
        >
          <li>Clear-space minimum : la hauteur du C autour du logo.</li>
          <li>Taille min : 24px en hauteur (long), 32px (square).</li>
          <li>White sur fond sombre, black sur fond clair ou vert.</li>
          <li>Jamais de recoloriage (pas de logo orange, bleu, etc.).</li>
          <li>Jamais d'effets (drop-shadow, outline, embossing).</li>
          <li>Jamais de déformation (toujours à l'échelle).</li>
        </ul>
      </DocBlock>
    </DocSubSection>
  </DocSection>
);

const LogoCard: React.FC<{
  background: string;
  variant: 'long' | 'square';
  theme: 'white' | 'black';
  filename: string;
}> = ({ background, variant, theme, filename }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      border: '1px solid var(--cy-border)',
      borderRadius: 'var(--cy-radius-xl)',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        background,
        height: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CyLogo variant={variant} theme={theme} size={variant === 'long' ? 32 : 56} />
    </div>
    <code
      style={{
        fontSize: 11,
        color: 'var(--cy-text-secondary)',
        padding: '8px 12px',
        fontFamily: 'ui-monospace, monospace',
      }}
    >
      {filename}
    </code>
  </div>
);

/* ============================================================
   GUIDELINES IA
   ============================================================ */

const AIGuidelinesSection: React.FC = () => (
  <DocSection id="ai-guidelines" title="Guidelines IA">
    <p
      style={{
        fontFamily: 'var(--cy-font-body)',
        fontSize: 'var(--cy-text-sm)',
        color: 'var(--cy-text-secondary)',
        lineHeight: 1.7,
        marginBottom: 24,
        maxWidth: 680,
      }}
    >
      Section critique. Ces règles sont à injecter dans le contexte de Claude Code, Cursor, Lovable,
      ou tout agent qui produit du code Cyrano.
    </p>

    <RulesBox variant="good" title="Règles absolues">
      <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li>Palette d'identité : green-300/400/500/600/700, deep-600/700/800/900/950, gray-300 à 900. Couleurs supplémentaires (yellow / red / violet, etc.) autorisées au cas par cas (ex : status alerts).</li>
        <li>Préfère CSS variables (--cy-green-500) ou tokens Tailwind quand ils existent ; hex en dur OK pour couleurs ponctuelles non-thématiques.</li>
        <li>Titres en Poppins, corps en Satoshi.</li>
        <li>Boutons rounded-full par défaut, rounded-xl uniquement pour la variant <code>icon</code>.</li>
        <li>CyAnimatedButton uniquement pour les CTAs majeurs (un par vue), en 3 tailles.</li>
        <li>Pas de sparkles, particules, magnetic pull, diamond spin.</li>
        <li>Logos : white sur sombre, black sur clair ou vert. Pas de recoloriage.</li>
        <li>Focus ring vert sur tous les éléments interactifs.</li>
      </ol>
    </RulesBox>

    <DocSubSection title="Tokens couleurs" description="Variables à coller dans tout projet Cyrano.">
      <CodeBlock
        lang="css"
        code={`:root {
  --cy-green-300: #74ffc5;
  --cy-green-400: #30f8a5;
  --cy-green-500: #05d37e;
  --cy-green-600: #00bc6f;
  --cy-green-700: #029358;

  --cy-deep-600: #016c78;
  --cy-deep-700: #014751;
  --cy-deep-800: #063841;
  --cy-deep-900: #111827;
  --cy-deep-950: #030712;

  --cy-gray-300: #d1d5db;
  --cy-gray-400: #9ca3af;
  --cy-gray-500: #6b7280;
  --cy-gray-600: #4b5563;
  --cy-gray-700: #374151;
  --cy-gray-800: #1f2937;
  --cy-gray-900: #111827;
}`}
      />
    </DocSubSection>

    <DocSubSection
      title="Prompt système IA"
      description="À coller en tête de chaque conversation Claude Code / Cursor / Lovable."
    >
      <CodeBlock
        lang="md"
        code={`# Cyrano Design System — System Prompt

Tu produis du code pour Cyrano (agence cold email B2B AI-native).
Tu DOIS respecter strictement le design system Cyrano.

## ARCHITECTURE EN 2 COUCHES

- src/components/core/ — primitives universelles (Button, Card, Badge, Input, Textarea, Status, Logo, Spinner, AnimatedButton). Utilisables partout, y compris sur des landings.
- src/components/app/ — couche additive pour les surfaces interactives (Toggle, Modal, Dropdown, Tabs, Toast, DataTable...). À créer au fur et à mesure des besoins de Cydash, SERGE, outils internes.

Règles :
- Toujours réutiliser core/ avant d'en créer un nouveau
- Un composant app/ peut importer du core/, jamais l'inverse
- Si un composant est utile aux apps ET aux landings, il appartient à core/, pas à app/

## RÈGLES ABSOLUES

### Couleurs
- Palette d'identité : green-300/400/500/600/700, deep-600/700/800/900/950, gray-300 à 900
- Couleurs supplémentaires autorisées au cas par cas (ex : yellow / red / violet pour les status alerts)
- Préfère CSS variables (--cy-green-500) ou tokens Tailwind quand ils existent ; hex en dur OK pour couleurs ponctuelles non-thématiques

### Typographie
- Titres : Poppins (font-heading), weights 600-800, letter-spacing -0.02em à -0.03em
- Corps : Satoshi (font-body), weights 400-600

### Boutons
- 5 variantes standards : primary / icon / outlined / ghost / disabled
- Rounded-full par défaut. EXCEPTION : variant icon en rounded-xl
- Primary : bg-gradient-primary, text deep-950, shadow vert, shine hover
- Icon : bg-gradient-primary, text deep-950, rounded-xl, icône à gauche
- CyAnimatedButton : UNIQUEMENT pour les CTAs majeurs, un par vue, en sm / md / lg
- INTERDIT : sparkles, particules, magnetic pull, diamond spin

### Logos
- Long en priorité, square uniquement si l'espace ne permet pas
- White sur fond sombre, black sur fond clair ou vert
- Jamais de recoloriage, déformation, outline

### Layout
- max-w-7xl global, max-w-2xl pour formulaires
- Section padding : py-12 (md), py-20 (large)

### Animations
- Hover : scale 1.02-1.03 + shadow intensify
- Active : scale 0.97-0.98
- Duration : 250ms par défaut, ease cubic-bezier(0.4,0,0.2,1)

### Accessibilité
- Focus ring vert sur tous les éléments interactifs
- Contraste min AA partout

### Backdrop blur
- Header sticky : backdrop-blur-md + bg/80
- Modals : backdrop-blur-lg + bg/60

## SI TU HÉSITES
- Paraphrase la question avant de coder
- Ne réinvente jamais un composant qui existe (CyButton, CyCard, CyBadge, CyInput, CyStatus, CyLogo, CyAnimatedButton, CySpinner)`}
      />
    </DocSubSection>

    <DocSubSection
      title="Composants réutilisables"
      description="Catalogue des composants prêts à l'emploi. Importer depuis ds/src/components."
    >
      <DocBlock>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            color: 'var(--cy-text-secondary)',
            fontSize: 'var(--cy-text-sm)',
            lineHeight: 1.6,
          }}
        >
          <li>
            <code style={{ color: 'var(--cy-green-400)' }}>CyButton</code> — variants primary / icon / outlined / ghost · sizes sm / md / lg · loading · disabled
          </li>
          <li>
            <code style={{ color: 'var(--cy-green-400)' }}>CyAnimatedButton</code> — CTA majeur, sizes sm / md / lg, optionnel href ou onClick
          </li>
          <li>
            <code style={{ color: 'var(--cy-green-400)' }}>CyCard</code> — featured, image, tags, title, description, action
          </li>
          <li>
            <code style={{ color: 'var(--cy-green-400)' }}>CyBadge</code> — variants default / outlined / featured / success / error / warning
          </li>
          <li>
            <code style={{ color: 'var(--cy-green-400)' }}>CyInput</code> / <code style={{ color: 'var(--cy-green-400)' }}>CyTextarea</code> — label, error, hint, icons (rounded-lg sur les deux)
          </li>
          <li>
            <code style={{ color: 'var(--cy-green-400)' }}>CyStatus</code> — types success / error / warning / info, title + message
          </li>
          <li>
            <code style={{ color: 'var(--cy-green-400)' }}>CyLogo</code> — variants long / square, themes auto / white / black, size en px
          </li>
          <li>
            <code style={{ color: 'var(--cy-green-400)' }}>CySpinner</code> — size en px (default 32)
          </li>
        </ul>
      </DocBlock>
    </DocSubSection>
  </DocSection>
);

export default App;
