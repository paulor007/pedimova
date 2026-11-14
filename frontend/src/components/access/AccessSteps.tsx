import { Info, Pause, Play } from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    title: "Escolha um perfil",
    text: "Cada um representa uma função da equipe da distribuidora.",
  },
  {
    title: "Entre na plataforma",
    text: "Nesta versão, o acesso é direto, sem usuário e senha.",
  },
  {
    title: "Veja o que ele pode fazer",
    text: "O menu e as ações mudam conforme as permissões do perfil.",
  },
];

export function AccessSteps() {
  const [paused, setPaused] = useState(false);

  return (
    <aside
      aria-labelledby="como-entrar"
      data-motion={paused ? "paused" : "running"}
      className="crosshair rounded-card border border-line bg-surface/80 p-6 backdrop-blur-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="como-entrar"
          className="font-mono text-2xs tracking-overline text-fg-muted uppercase"
        >
          Como funciona o acesso
        </h2>

        <button
          type="button"
          onClick={() => setPaused((current) => !current)}
          className="inline-flex min-h-11 items-center gap-2 rounded-control px-2 text-xs text-fg-muted transition-colors hover:text-fg motion-reduce:hidden"
        >
          {paused ? (
            <Play aria-hidden="true" className="size-4" />
          ) : (
            <Pause aria-hidden="true" className="size-4" />
          )}

          {paused ? "Retomar movimento" : "Pausar movimento"}
        </button>
      </div>

      <ol className="mt-5 grid gap-5">
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative flex gap-4">
            {index < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className="step-connector pointer-events-none absolute top-9 bottom-[-1.25rem] left-[0.9375rem] w-px motion-safe:animate-step-flow"
              />
            )}

            <span
              aria-hidden="true"
              className={
                index === 0
                  ? "flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-on-accent shadow-glow"
                  : "flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-fg-muted"
              }
            >
              {index + 1}
            </span>

            <div>
              <p className="font-semibold text-fg">{step.title}</p>
              <p className="mt-0.5 text-sm text-fg-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 flex gap-3 rounded-control border border-warning/30 bg-warning/5 p-4 text-sm text-fg">
        <Info
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-warning"
        />
        Ambiente de demonstração: os dados são de exemplo, e o perfil escolhido
        fica guardado só neste navegador.
      </p>
    </aside>
  );
}
