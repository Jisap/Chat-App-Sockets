import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';
// npm i sweetalert2

export const LoginPage = () => {

	const { login } = useContext(AuthContext);						  // Extraemos del context la función login		

	const [form, setForm] = useState({ // Estado form
		email:'test1@test.com',
		password: '123456',
		rememberme: true
	});

	useEffect(() => {													// Cuando se carge el loginPage
		const email = localStorage.getItem('email');		            // Vemos si hay un email en localStorage
		if( email ){									        		// Si lo hay
			setForm( (form) => ({									    // cambiamos el estado 
				...form,												 
				rememberme:true,										// de remenberme a true
				email													// y el valor del input del email al guardado
			}));
		}
	},[])


	const onChange = ({ target }) => {			// Del evento extraemos el target
		const { name, value } = target;			// Y del target el name y su valor
		setForm({
			...form,						    // le establecemos todos los valores del initialState y le 
			[name]:value						// cambiamos el estado del form con el nuevo value del input
		})
	}

	const toggleCheck = () => {
		setForm({
			...form,
			rememberme: !form.rememberme		// Cambiamos el check al estado opuesto que tuviera.
		})
	}

	const onSubmit = async( ev ) => {								// Cuando demos a submit en el formulario
		ev.preventDefault();										// preventDefault para evitar la recarga de la página
		
		if(form.rememberme){										// Si el rememberme esta checkeado
			localStorage.setItem( 'email', form.email );			// guardamos en localStorage el valor del email del input
		}else{
			localStorage.removeItem( 'email' );						// sino esta chekeado borramos lo que hubiera en localStorage con el nombre email
		}

		const { email, password } = form;
		const ok = await login( email, password );					// Logueamos con los inputs del form.
		
		if (!ok){
			Swal.fire('Error','Verifique el usuario y contraseña','error')
		}

	}

	const todoOk = () => {
		return ( form.email.length > 0 && form.password.length > 0) ? true : false;
	}


    return (
        <form 
			className="login100-form validate-form flex-sb flex-w"
			onSubmit={ onSubmit }>
			<span className="login100-form-title mb-3">
						Chat - Ingreso
			</span>
					
				<div className="wrap-input100 validate-input mb-3">
					<input 
						className="input100" 
						type="email" 
						name="email" 
						placeholder="Email" 
						value={ form.email }
						onChange={ onChange }
						/>
						<span className="focus-input100"></span>
				</div>
					
					
				<div className="wrap-input100 validate-input mb-3">
					<input 
						className="input100" 
						type="password" 
						name="password" 
						placeholder="Password" 
						value={ form.password }
						onChange={ onChange }
						/>
						<span className="focus-input100"></span>
				</div>
					
				<div className="row mb-3">
					<div 
						className="col"
						onClick={ () => toggleCheck() }
					>
						<input 
							className="input-checkbox100" 
							id="ckb1" 
							type="checkbox" 
							name="rememberme" 
							checked={ form.rememberme }
							readOnly
							/>
						<label className="label-checkbox100">
								Recordarme
						</label>
					</div>

					<div className="col text-right">
						<Link to="/auth/register" className="txt1">
							Nueva cuenta?
						</Link>
					</div>
				</div>

				<div className="container-login100-form-btn m-t-17">
					<button 
						type="submit"
						className="login100-form-btn"
						disabled={ !todoOk() }>
						Ingresar
					</button>
				</div>

		</form>

    )
}
