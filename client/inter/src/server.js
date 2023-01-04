export var NomeAtual = "";
export var SenhaAtual = "";
export var EmailAtual = "";
export var TelefoneAtual = "";
export var TipoAtual = "";
export var CpfAtual = "";

export function UsuarioAtual(nome , senha, email, telefone, tipo, cpf)
{
    NomeAtual = nome;
    SenhaAtual = senha;
    EmailAtual = email;
    TelefoneAtual = telefone;
    TipoAtual = tipo;
    CpfAtual = cpf;
}

export function LogOut()
{
    NomeAtual = "";
    SenhaAtual = "";
    EmailAtual = "";
    TelefoneAtual = "";
    TipoAtual = "";
    CpfAtual = "";
}