
// numberValidation.js
export function priceValidation(selector, options = {}) {
  const inputs = Array.from(document.querySelectorAll(selector));

  // helpers
  const ensureErrEl = (input) => {
    let err = document.getElementById(`${input.id}Error`);
    if (!err) {
      err = document.createElement("small");
      err.id = `${input.id}Error`;
      err.className = "error-msg";
      input.insertAdjacentElement("afterend", err);
    }
    return err;
  };

  const setError = (input, msg) => {
    const err = ensureErrEl(input);
    err.textContent = msg;
    input.classList.toggle("is-invalid", !!msg);
  };

  const parseNumber = (val) => {
    const raw = (val ?? "").trim();
    if (raw === "") return { empty: true, ok: true, num: null };
    const normalized = raw.replace(/,/g, ".");
    const ok = /^\d+(\.\d{0,2})?$/.test(normalized);
    return { empty: false, ok, num: ok ? Number(normalized) : null };
  };

  // valida el par min/max si se configuró
  const checkPair = () => {
    const pair = options.pair; // { a: '#minPrice', b: '#maxPrice', message?: string }
    if (!pair) return true;

    const a = document.querySelector(pair.a);
    const b = document.querySelector(pair.b);
    if (!a || !b) return true;

    const A = parseNumber(a.value);
    const B = parseNumber(b.value);

    // si ambos tienen número válido y A > B => error de rango
    const invalidRange = A.num != null && B.num != null && A.num > B.num;
    const msg = pair.message || "El mínimo no puede ser mayor que el máximo.";

    if (invalidRange) {
      // mostrar error de rango SOLO si no hay error numérico previo
      if (A.ok && !A.empty) setError(a, msg);
      if (B.ok && !B.empty) setError(b, msg);
      return false;
    } else {
      // limpiar errores de rango cuando el rango es válido
      if (A.ok) setError(a, "");
      if (B.ok) setError(b, "");
      return true;
    }
  };

  const validateOne = (input) => {
    const { empty, ok } = parseNumber(input.value);

    if (empty) {
      // campo vacío → sin error
      setError(input, "");
      // igual revalidamos el par por si el otro tiene valor
      checkPair();
      return;
    }

    if (!ok) {
      setError(
        input,
        "Ingresá solo números (usa punto para decimales y máximo 2 decimales)."
      );
      return;
    }

    // numérico ok → limpiamos mensaje numérico y verificamos el par
    setError(input, "");
    checkPair();
  };

  // listeners por input
  inputs.forEach((input) => {
    ensureErrEl(input);

    input.addEventListener("input", () => validateOne(input));
    input.addEventListener("blur", () => validateOne(input));
  });

  // validación inicial del par
  checkPair();
}

