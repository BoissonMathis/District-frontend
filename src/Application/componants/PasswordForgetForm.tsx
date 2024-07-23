import { useNavigate } from "react-router-dom"

export function PasswordForgetForm () {
    const navigate = useNavigate()

    return (
        <div>
            <form action="" className="col">
                <div className="auth-input-text-form mb-12">
                    <label htmlFor="email">Email</label>
                    <input className='auth-input-text' type="text" id="email"/>
                </div>
                <a className="form-a" onClick={() => navigate('/login')}>S'authentifier</a>
                <button className="auth-btn mb-4">Envoyer moi un E-mail</button>
                <a className="form-a" onClick={() => navigate('/signup')}>Pas encore inscrit ? S'inscrire</a>
            </form>
        </div>
    )
}