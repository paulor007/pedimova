import { useState } from "react";

import { Card } from "../../components/ui/Card";
import { CurrencyField } from "../../components/ui/CurrencyField";
import { MaskedTextField } from "../../components/ui/MaskedTextField";
import {
  documentKind,
  isValidCnpj,
  isValidCpf,
  maskDocument,
  normalizeDocument,
} from "../../lib/documents";
import { maskCep, maskPhone, onlyDigits } from "../../lib/masks";

type FormattedDraft = {
  document: string;
  cep: string;
  phone: string;
  priceCents: number;
  quantity: string;
};

const EMPTY_DRAFT: FormattedDraft = {
  document: "",
  cep: "",
  phone: "",
  priceCents: 0,
  quantity: "",
};

/** Limits quantity to six digits. */
function maskQuantity(value: string): string {
  return onlyDigits(value).slice(0, 6);
}

/** Shows an error once a complete document is invalid. */
function documentError(formatted: string): string | undefined {
  const normalized = normalizeDocument(formatted);
  const kind = documentKind(normalized);

  if (kind === "CPF" && normalized.length === 11 && !isValidCpf(normalized)) {
    return "CPF inválido: confira os números.";
  }

  if (kind === "CNPJ" && normalized.length === 14 && !isValidCnpj(normalized)) {
    return "CNPJ inválido: confira os caracteres.";
  }

  return undefined;
}

/** Demonstrates formatted values and their stored representation. */
export function FormattedFieldsSection() {
  const [draft, setDraft] = useState<FormattedDraft>(EMPTY_DRAFT);

  function update<K extends keyof FormattedDraft>(
    field: K,
    value: FormattedDraft[K],
  ) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  const normalizedDocument = normalizeDocument(draft.document);

  const stored = [
    {
      label: "Documento",
      value: normalizedDocument
        ? `${normalizedDocument} (${documentKind(normalizedDocument)})`
        : "—",
    },
    {
      label: "CEP",
      value: onlyDigits(draft.cep) || "—",
    },
    {
      label: "Telefone",
      value: onlyDigits(draft.phone) || "—",
    },
    {
      label: "Preço",
      value: `${draft.priceCents} centavos`,
    },
    {
      label: "Quantidade",
      value: draft.quantity ? Number(draft.quantity) : "—",
    },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">Campos com formato</h2>

      <p className="mt-1 text-sm text-fg-muted">
        A tela mostra o texto formatado; o sistema guarda só o valor, como ao
        lado.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <MaskedTextField
              label="CPF ou CNPJ"
              name="document"
              inputMode="text"
              autoCapitalize="characters"
              value={draft.document}
              mask={maskDocument}
              onValueChange={(value) => update("document", value)}
              hint="CNPJs emitidos desde julho de 2026 podem ter letras."
              error={documentError(draft.document)}
            />
          </div>

          <MaskedTextField
            label="CEP"
            name="cep"
            autoComplete="postal-code"
            value={draft.cep}
            mask={maskCep}
            onValueChange={(value) => update("cep", value)}
          />

          <MaskedTextField
            label="Telefone"
            name="phone"
            type="tel"
            autoComplete="tel-national"
            value={draft.phone}
            mask={maskPhone}
            onValueChange={(value) => update("phone", value)}
          />

          <CurrencyField
            label="Preço"
            name="price"
            cents={draft.priceCents}
            onCentsChange={(cents) => update("priceCents", cents)}
          />

          <MaskedTextField
            label="Quantidade"
            name="quantity"
            value={draft.quantity}
            mask={maskQuantity}
            onValueChange={(value) => update("quantity", value)}
            className="text-right tabular-nums"
          />
        </Card>

        <Card>
          <h3 className="font-mono text-2xs tracking-overline text-fg-muted uppercase">
            Valor guardado
          </h3>

          <dl className="mt-3 divide-y divide-line text-sm">
            {stored.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 py-2"
              >
                <dt className="text-fg-muted">{item.label}</dt>

                <dd className="text-right font-mono text-xs break-all text-fg">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </section>
  );
}
