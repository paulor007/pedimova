import { Save } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { SelectField } from "../../components/ui/SelectField";
import { TextAreaField } from "../../components/ui/TextAreaField";
import { TextField } from "../../components/ui/TextField";

type CustomerDraft = {
  name: string;
  email: string;
  type: "" | "PF" | "PJ";
  notes: string;
};

type DraftErrors = Partial<Record<keyof CustomerDraft, string>>;

const EMPTY_DRAFT: CustomerDraft = {
  name: "",
  email: "",
  type: "",
  notes: "",
};

const NOTES_MAX = 200;

const TYPE_OPTIONS = [
  { value: "PF", label: "Pessoa física" },
  { value: "PJ", label: "Pessoa jurídica" },
];

/** Validates the customer draft and returns field-specific errors. */
function validateDraft(draft: CustomerDraft): DraftErrors {
  const errors: DraftErrors = {};

  if (draft.name.trim().length < 3) {
    errors.name = "Informe o nome, com pelo menos 3 letras.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
    errors.email = "Informe um e-mail válido, como nome@empresa.com.br.";
  }

  if (draft.type === "") {
    errors.type = "Escolha o tipo de cliente.";
  }

  if (draft.notes.length > NOTES_MAX) {
    errors.notes = `Use no máximo ${NOTES_MAX} caracteres.`;
  }

  return errors;
}

/** Example form: a simplified customer, validated when saving. */
export function FormFieldsSection() {
  const [draft, setDraft] = useState<CustomerDraft>(EMPTY_DRAFT);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [savedName, setSavedName] = useState<string | null>(null);

  // Errors are derived from the current draft.
  const errors = wasSubmitted ? validateDraft(draft) : {};

  function update<K extends keyof CustomerDraft>(
    field: K,
    value: CustomerDraft[K],
  ) {
    setDraft((current) => ({ ...current, [field]: value }));
    setSavedName(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateDraft(draft);
    const firstInvalid = Object.keys(found)[0];

    if (firstInvalid) {
      setWasSubmitted(true);

      // Find the first invalid field by its name.
      const field = event.currentTarget.elements.namedItem(firstInvalid);

      if (field instanceof HTMLElement) {
        field.focus();
      }

      return;
    }

    setSavedName(draft.name.trim());
    setDraft(EMPTY_DRAFT);
    setWasSubmitted(false);
  }

  function handleClear() {
    setDraft(EMPTY_DRAFT);
    setWasSubmitted(false);
    setSavedName(null);
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">Campos de formulário</h2>

      <p className="mt-1 text-sm text-fg-muted">
        Cadastro de exemplo: os erros aparecem ao salvar e somem enquanto você
        corrige.
      </p>

      <Card className="mt-6 max-w-2xl">
        <form noValidate onSubmit={handleSubmit} className="grid gap-5">
          <p className="text-xs text-fg-muted">
            Campos com <span className="text-danger">*</span> são obrigatórios.
          </p>

          <TextField
            label="Nome"
            name="name"
            required
            autoComplete="name"
            value={draft.name}
            onChange={(event) => update("name", event.target.value)}
            error={errors.name}
          />

          <TextField
            label="E-mail"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={draft.email}
            onChange={(event) => update("email", event.target.value)}
            hint="Usado para avisar o cliente sobre cada pedido."
            error={errors.email}
          />

          <SelectField
            label="Tipo de cliente"
            name="type"
            required
            placeholder="Escolha uma opção"
            options={TYPE_OPTIONS}
            value={draft.type}
            onChange={(event) =>
              update("type", event.target.value as CustomerDraft["type"])
            }
            error={errors.type}
          />

          <TextAreaField
            label="Observações"
            name="notes"
            maxLength={NOTES_MAX}
            value={draft.notes}
            onChange={(event) => update("notes", event.target.value)}
            hint={`${draft.notes.length} de ${NOTES_MAX} caracteres`}
            error={errors.notes}
          />

          <TextField
            label="Código do cliente"
            name="code"
            defaultValue="Gerado ao salvar"
            disabled
            hint="Campo desativado, só para mostrar o estado."
          />

          <div className="flex flex-wrap gap-3">
            <Button type="submit">
              <Save aria-hidden="true" className="size-4" />
              Salvar cliente
            </Button>

            <Button variant="ghost" onClick={handleClear}>
              Limpar
            </Button>
          </div>

          <p aria-live="polite" className="text-sm text-success">
            {savedName && `Cliente ${savedName} pronto para salvar.`}
          </p>
        </form>
      </Card>
    </section>
  );
}
