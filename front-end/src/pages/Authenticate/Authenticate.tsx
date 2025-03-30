import { useRef } from "react";
import { MODELS } from "../../shared/api-calls/aiApi";

const Authenticate = ({
  login,
  abort,
  model,
  loading,
  error,
  size,
  completed,
}: {
  login: (model: string) => void;
  abort: (model: string) => void;
  model: string;
  loading: boolean;
  error: string;
  size: string;
  completed: string;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  function formAction(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (formRef && formRef.current) {
      const formData = new FormData(formRef.current);
      const selectedModel = (formData.get("model") as string) || model;
      if (loading && !error) {
        abort(selectedModel);
      } else {
        login(selectedModel);
      }
    }
    formRef?.current?.reset();
  }

  return (
    <section className="auth">
      <form id="auth-form" className="auth__form" onSubmit={formAction} ref={formRef}>
        <select
          className="form__selector"
          name="model"
          defaultValue={model || MODELS[0].value}
          disabled={loading && !error}
        >
          {MODELS.map((m, i) => (
            <option key={i} className="selector__option" value={m.value}>
              {m.name}
            </option>
          ))}
        </select>
        <button
          className={
            loading && !error
              ? "form__btn --loading"
              : "form__btn"
          }
          type="submit"
        >
          {loading && !error ? "abort" : "start"}
        </button>
      </form>
      <div className="auth__status">
        {loading && !error ? (
          <>
            <div className="status__loading">
              <p className="loading-text">downloading model&nbsp;</p>
              <svg
                className="loading-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <circle cx="18" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin=".67"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle cx="12" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin=".33"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle cx="6" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin="0"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
              </svg>
            </div>
            <div className="status__progress">
              {completed && (
                <span className="loading__completed">{completed}</span>
              )}
              {size && <span className="loading__total">&nbsp;of {size}</span>}
            </div>
          </>
        ) : (
          <p className="status__error">{error}</p>
        )}
      </div>
    </section>
  );
};

export default Authenticate;
