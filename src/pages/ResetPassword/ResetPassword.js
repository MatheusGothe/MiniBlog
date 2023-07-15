import { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { resetPassword } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.resetPassword}>
      <h1>Redefinir senha</h1>
      <p>
        Insira o seu e-mail abaixo para receber um link para redefinir sua
        senha.
      </p>

      {success ? (
        <p className={styles.success}>
          Um e-mail foi enviado para {email} com instruções para redefinir sua
          senha.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            <span>E-mail:</span>
            <input
              type="email"
              name="email"
              required
              placeholder="E-mail do usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button className="btn">Redefinir senha</button>

          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
