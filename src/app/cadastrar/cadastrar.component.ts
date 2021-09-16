import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {

    if(this.user.nome.length<2){
      alert('Preencher o nome com pelo menos 2 caracteres')
    }

    else if(this.user.usuario.indexOf('@') == -1 || this.user.usuario.indexOf('.') == -1){
      alert('preencher o usuario com "@" e "." ')
    }

    this.user.tipo = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])/* Esse comando manda o usuario para uma rota interna. Serve para melhorar a usabilidade do usuario, para ficare mais rapido e pratico! */
        alert('Usuario cadastrado com sucesso!')
      })
    }

  }

}
