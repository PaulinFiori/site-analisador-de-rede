var Y = 0;
var U = 0;
var N = 0;
var M = 0;
var K = 0;
var B = 0;
var P0 = 0;
var Dados = "";
var ValoresInseridos = "";
var NomeFila = "";
var Id_Fila = 0;

//Fatorial variaval global.

function fatorial(n) {
    let fat;
    for (fat = 1; n > 1; n = n - 1) {
        fat = fat * n;
    }

    return fat;
}

//M/M/1
function P0_1(ro)
{
    return 1 - ro;
}

function Pn_1(ro,n)
{
    return (1 - ro) * (ro**n); 
}

function ro_1(y,u)
{
    return y / u;
}

function utilizacao_1(y,u)
{
    return y / u;
}

//Número médio de requisições no Sistema
function En_1(ro)
{
    return ro / (1 - ro);
}

//Probabilidade de ter n ou mais requisições no sistema:
function P_1(ro,n)
{
    return ro ** n;
}
//Tempo médio de resposta para uma requisição: 
function Es_1(u,ro)
{
    return 1 / (u * (1 - ro));
}

//Tempo médio de espera na fila de uma requisição
function Ew_1(u,ro)
{
    return 1 / (u * (1 - ro));
}

//Número médio de requisições na fila
function Enw_1(ro)
{
    return (ro**2) / (1 - ro);
}

//M/M/m - 2
function somatoria_2(m, ro)
{
    let result = 0;
    for (let n = 0; n < m-1; n++) {
        let aux;
        aux = ((m * ro) ** n) / fatorial(n);
        result += aux;
    }
    return result;
}

function ro_2(y,m,u) {
    if (y > m) {
        return y / (m * u);
    } 
    
    else if(y < m){
        return y / u;
    }
}

function po_2(m,ro,n)
{  
    return 1/ ((m*ro)**m) / (((fatorial(m)) * (1 - ro)) + (somatoria_2(m,ro)) * (((m*ro)**n) / (fatorial(n))));   
}

function pn_2(m,ro,n)
{
    var pn = 0;
    if(n <= m)
    {
        pn = (((m * ro**n) / fatorial(n)) * po_2(m,ro,n));
    }

    else if(n >= m)
    {
        pn = (((ro**n) * (m ** m)) / fatorial(M)) * po_2(m,ro,n);
    }

    return pn;
}

function C_earling_2(m, n, ro)
{
    return po_2(m,ro,n) * (((m * ro)** m) / (fatorial(m)) * (1 - ro));
}

//Número médio de requisições em espera
function enw_2(m, n, ro)
{
    return (ro * C_earling_2(m, n, ro)) / (1 - ro);
}

//Número esperado de requisições em atendimento
function ens_2(m,ro)
{
    return m * ro;
}

//Número de requisições no sistema
function en_2(m,n,ro)
{
    return enw_2(m,n,ro) + ens_2(m,ro);
}

function utilizacao_2(ro)
{
    return ro;
}

//Tempo médio de resposta
function es_2(y,m,n,ro)
{
    return en_2(m,n,ro) / y;
}

//Tempo médio de espera na fila
function ew_2(y,m,n,ro)
{
    return enw_2(m,n,ro) / y;
}

//M/M/(Infinitos) - 3

//Quando chega um novo cliente no sistema. taxa de serviço é aumentado também

//Probabilidade de n requisições no sistema (Pn)
function PnInfinito_3(ro, n)
{
    return ((ro ** n) / fatorial(n)) * po_2(1, n, ro);
}

function U_3(n,u){ //taxa de serviço é aumentado cada vez que entra n clientes
    
    var Total_de_taxa_de_servico = u*n;
    return Total_de_taxa_de_servico;
}

//Cálculo do "ro"
function RoInfinito_3(y, u)
{
    if (y > 1) {
        return y / u;
    } else {
        return 0;
    }
}

//Número médio de clientes no sistema
function En_3(y,u)
{
    return y/u;
}

//Tempo médio de resposta = taxa de serviço
function Es_3(u)
{
    return 1/u;
}

//M/M/1/ -- 4

function Y_4(y,n,b){ //taxa de serviço
    if (n < b){
        return y;
    } else if (n >= b){
        return 0;
    }
}

function Ro_4(y, u) {
    if (y > 1) {
        return y / u;
    } else {
        return 0;
    }
}

function utilizacao_4(ro, pb)
{
    return (ro*(1-pb));
}

function po_4(ro, b){ // po = probabilidade de o sistema conter nenhum usuarios
    var pn = 1-ro;
    if (pn > 0){
        return pn;
    }
    else if (pn >= b){
        return 0;
    }
    else if (pn == 0){
        return 0;
    }
} 

function pb_4(ro, b) //pb é a probabilidade de o sistema estar totalmente cheio. Sistema sempre cheio (p < infinto)
{
    let pb = ((1-ro)/(1-Math.pow(ro, b+1)))*Math.pow(ro, b);
    return pb;
}

function pn_4(usuarios, ro, b) //pn = probabilidade de n usuarios no sistema
{
    if (usuarios > b)
    {
        return 0;
    } 
    else 
    {
        return ((1-ro)/1-Math.pow(ro,(b+1))*Math.pow(ro,usuarios));
    }
}

function Yi_4(y,pb)//taxa efetiva de chegada
{
    let yi = y*(1-pb);
    return yi;
}

function taxa_de_perda_4(y, pb){
    let perda = y*pb;
    return perda;
}

function En_4(ro, b){ //En = numero media de usuarios no sistema
    let En = (ro/(1-ro))-(((b+1)*Math.pow(ro,b+1))/(1-Math.pow(ro,b+1)));
    return En;
}

function Enw_4(ro, b){ // Enw = numero media de usuarios na fila
    let Enw = (ro/(1-ro))-((1+b*Math.pow(ro,b))/(1-Math.pow(ro,b+1)));
    return Enw;
}

function Es_4(En, y, pb){ // Es = tempo de resposta
    let Es = En/(y*(1-pb));
    return Es;
}

function Ew_4(Enw, y, pb){ //Ew = tempo de espera
    let Ew = Enw/(y*(1-pb));
    return Ew;
}


//M/M/m/B - 5

//chamada de funções
function Y_5(y,n,b){ //verificação da taxa de chegada
    if (n < b){
        return y;
    } else if (n >= b){
        return 0;
    }
}

function Ro_5(y, u, m) {
    if (y > 1) {
        return (y / (m*u));
    } else {
        return 0;
    }
}

function utilizacao_5(ro, pb)
{
    return (ro*(1-pb));
}

function po_5(ro, b, m){ // po = probabilidade de o sistema conter nenhum usuarios

    return 1/(1+((1-Math.pow(ro,(b-m+1))*Math.pow((m*ro),m)))/(fatorial(m)*(1-ro))+(soma_5(m, ro))); 

} 

function pb_5(ro, b) //pb é a probabilidade de o sistema estar totalmente cheio. Sistema sempre cheio (p < infinto)
{
    var pb = ((1-ro)/(1-Math.pow(ro, (b+1))))*Math.pow(ro, b);
    return pb;
}

function soma_5(m, ro) {
    let result = 0;
    for (let n = 0; n < m-1; n++) {
        let aux;
        aux = ((m * ro) ** n) / fatorial(n);
        result += aux;
    }
    return result;
}

function pn_5(n, y, u, b, m, po) //pn = probabilidade de n usuarios no sistema
{
    if (n<m)
    {
        return (Math.pow((y/u), n)*(1/fatorial(n))*po);
    } 
    else if (m <=n && n <= b)
    {
        return ((Math.pow(m,m)/fatorial(m))*(Math.pow((y/u),n))*po);
    }
}

function Yi_5(y,pb)
{
    let yi = y*(1-pb);
    return yi;
}

function taxa_de_perda_5(y, pb){
    let perda = y*pb;
    return perda;
}

function En_5(b, pn) { //En = numero media de usuarios no sistema
    let result = 0;
    for (let n = 1; n < b; n++) {
        let aux;
        aux = ((n*pn));
        result += aux;
    }
    return result;
}

function Enw_5(b, m, pn){ // Enw = numero media de usuarios na fila
    let result = 0;
    for (let n = 1; n < b; n++) {
        let aux;
        aux = ((n-m)*pn);
        result += aux;
    }
    return result;
}

function Es_5(En, y, pb){ // Es = tempo de resposta
    let Es = En/(y*(1-pb));
    return Es;
}

function Ew_5(Enw, y, pb){ //Ew = tempo de espera
    let Ew = Enw/(y*(1-pb));
    return Ew;
}

//M/M/1/K - 6

//lambda do K
function Y_6(y, k, n){
    if (0 <= n && n <= k){
        return y*(K-n);
    }
    else if ( n > k ){
        return 0;
    }
}

// ro 
function ro_6(y,u){
    return y/u;
}

// probabilidade de exisitir cliente no sistema

// pegar e armazenar o lambda k e colocar como y 
function pn_6(k, y, u, n, po){
    if (0 <= k && n <= k){
        var t = k-n;
        return Math.pow(y/u, n) * (fatorial(k)/(fatorial(t))*po);
    } else if (n > k){
        return 0;
    }
}

function soma_6(k, y, u) {
    let result = 0;
    for (let n = 0; n < k; n++) {
        let aux;
        aux = ((y/u)**n);
        result += aux;
    }
    return result;
}

// probabilidade de não existir ninguem no sistema
function po_6(y, k, u, n){
    return 1/(soma_6(k, y, u)*((fatorial(k))/(fatorial(k-n))));        
}

function utilizacao_6(k, ro, en){
    return ro* (k - en);
}

//no. media de usuarios na fila
function Enw_6(k, y, u, po){
    return k - ((y-u) /y ) * (1 - po);    
}

//media de usuarios no sistema
function En_6(enw, po){
    return enw + (1 - po);
}

//tempo media de espera na fila
function Ew_6(enw, y, k, en){
    return enw / ( y * (k - en));
}

// tempo media de respostas 
function Es_6(ew, u){
    return ew + (1 / u);
}

//Taxa Efetiva de chegada 
function Yi_6(u, po){
    return u * (1 - po);
}

//M/M/(infintos)/K - 7
function un_7(n,u)
{
    return n * u;
}
//Intensidade de tráfego
function p_7(k,y,u)
{
    return (k * y) / (1 + (y / u));
}

//Número médio de clientes no sistema
function en_7(k,y,u)
{
    return (k * (y / u)) / (1 + (y / u));
}

//M/M/B/K - 8
function fatorial8(n)
{
    let fat;
    for (fat = 1; n > 1; n = n - 1) {
        fat = fat * n;
    }

    return fat;
}

function somatorio8(m,y,u)
{
    let result = 0;
    for (let n = 0; n < m; n++) {
        let aux;
        aux = ((m * Ro8(y,m,u)) ** n) / fatorial8(n);
        result += aux;
    }
    return result;
}

function Yn8 (y,k,n,b)
{
    if(n >= 0 && b - 1 >= n) return y * (k - n);
    else if(n > b) return 0;
}

function Un8(n,u,m)
{
    if(n >= 0 && m >= n) return n * u;
    else if(n >= m) return m * u;
}

function PB8(y,m,u,b)
{
    let pb = ((1- Ro8(y,m,u) ) / (1-Math.pow(Ro8(y,m,u), b + 1))) * Math.pow(Ro8(y,m,u), b);
    return pb;
}

function Pn8(y,u,k,n,m,p0)
{

    if(n >= 0 && m - 1 >= n)  { 
        return ((y / u) ** n) * (fatorial8(k) / (fatorial8(n) * fatorial8(k - n))) * p0;
    } else if (k >= n && n >= m ) {
        return ((y / u) ** n) * (fatorial8(k) / (fatorial8(n) * fatorial8(k - n))) * (fatorial8(n) / fatorial8(m)) * (m ** (m - n)) * p0;
    }
}

function Ro8(y,m,u)
{
    return y / (m * u);
}

function Utlizacao8(y,m,n,u,k,b,p0)
{
    return Ro8(y,m,u) * (k - En8(m,n,k,y,u,p0) - (k - b) * PB8(y,m,u,b));
}

function En8(m,n,k,y,u,p0)
{
    return somatorio8(m,y,u) * Pn8(y,u,k,n,m,p0);
}

function Ew8(m,n,k,y,u,b,p0)
{
    return En8(m,n,k,y,u,p0) / Y_chegada8(m,n,k,y,u,p0);
}

function Es8(m,n,k,y,u,b,p0)
{
    return En8(m,n,k,y,u,p0) / (y * (k - En8(m,n,k,y,u,p0) - (k - b) * PB8(y,m,u,b)))
}

function Y_chegada8(m,n,k,y,u,p0)
{
    return y * (n - En8(m,n,k,y,u,p0));
}

P0 /= 100;

//Menu
export function ReceberDados(y,u,n,m,k,b,po)
{
    Y = y;
    U = u;
    N = n;
    M = m;
    K = k;
    B = b;
    P0 = po;
    ValoresInseridos = "<br/>Taxa de chegada: " + Y + "<br/> Taxa de serviço: " + U + "<br/> Numero de usuários: " + N + "<br/> Servidores: " + M + "<br/> População: "  + K + "<br/> Capacidade: " + B + "<br> Probabilidade de não exisitir usuário no sistema: " + P0;
}

export function Print(FilaEscolhida)
{
    var opcao = FilaEscolhida;
    switch(opcao) {
        case '1':
            let Ro1 = ro_1(Y,U);
            let Po1 = P0_1(Ro1);
            let Pn1 = Pn_1(Ro1,N);
            let Utilizacao1 = utilizacao_1(Y,U);
            let En1 = En_1(Ro1);
            let P1 = P_1(Ro1,N);
            let S1 = Es_1(U,Ro1);
            let Ew1 = Ew_1(U,Ro1);
            let Enw1 = Enw_1(Ro1);

            var ro1 = Ro1.toFixed(4);
            var po1 = Po1.toFixed(4);
            var pn1 = Pn1.toFixed(4);
            var utilizacao1 = Utilizacao1.toFixed(4);
            var en1 = En1.toFixed(4);
            var p1 = P1.toFixed(4);
            var s1 = S1.toFixed(4);
            var ew1 = Ew1.toFixed(4);
            var enw1 = Enw1.toFixed(4);

            NomeFila = "Sistema Clássico";
            Id_Fila = 1;
            Dados = "Intensidade de trafego: " + ro1 + "<br/> Probabilidade de nenhum usuário no sistema: " + po1 + "<br/> Probabilidade de ter n ou mais requisições no sistema: " + pn1 + "<br/> Utilização do servidor: " + utilizacao1 + "<br/> Número médio de requisições no Sistema: " + en1 + "<br/> Probabilidade de ter n ou mais requisições no sistema: " + p1 + "<br/> Tempo médio de resposta para uma requisição: " + s1 + "<br/> Tempo médio de espera na fila de uma requisição: " + ew1 + "<br/> Número médio de requisições na fila: " + enw1;
            break;

        case '2':
            let Ro2 = ro_2(Y,M,U);
            let Po2 = po_2(M,Ro2,N);
            let Pn2 = pn_2(M,Ro2,N);
            let Cearling2 = C_earling_2(M,Ro2,N);
            let Enw2 = enw_2(M,N,Ro2);
            let Ens2 = ens_2(M,Ro2);
            let En2 = en_2(M,N,Ro2);
            let Utilizacao2 = utilizacao_2(Ro2);
            let Es2 = es_2(Y,M,N,Ro2);
            let Ew2 = ew_2(Y,M,N,Ro2);

            var ro2 = Ro2.toFixed(4);
            var po2 = Po2.toFixed(4);
            var pn2 = Pn2.toFixed(4);
            var cearling2 = Cearling2.toFixed(4);
            var enw2 = Enw2.toFixed(4);
            var ens2 = Ens2.toFixed(4);
            var en2 = En2.toFixed(4);
            var utilizacao2 = Utilizacao2.toFixed(4);
            var es2 = Es2.toFixed(4);
            var ew2 = Ew2.toFixed(4);

            NomeFila = "M-servidores";
            Id_Fila = 2;
            Dados = "Intensidade de trafego: " + ro2 + "<br/> Probabilidade de nenhum usuário no sistema: " + po2 + "<br/> Probabilidade de ter n ou mais requisições no sistema: " + pn2 + "<br/> C Earling: " + cearling2 + "<br/> Número médio de requisições em espera: " + enw2 + "<br/> Número esperado de requisições em atendimento: " + ens2 + "<br/> Número de requisições no sistema: " + en2 + "<br/> Utilização do servidor: " + utilizacao2 + "<br/> Tempo médio de resposta para uma requisição: " + es2 + "<br/> Tempo médio de espera na fila de uma requisição: " + ew2 ;
            break;

        case '3':
            let Roinfinito = RoInfinito_3(Y,U,N);
            let Pn3 = PnInfinito_3(Roinfinito,N);
            let U3 = U_3(N,U);
            let En3 = En_3(Y,U);
            let Es3 = Es_3(U);

            var roinfinito = Roinfinito.toFixed(4);
            var pn3 = Pn3.toFixed(4);
            var u3 = U3.toFixed(4);
            var en3 = En3.toFixed(4);
            var es3 = Es3.toFixed(4);

            NomeFila = "Infintos servidores";
            Id_Fila = 3;
            Dados = "Probabilidade de ter n ou mais requisições no sistema: " + pn3 + "<br/> Utilização do servidor: " + u3 + "<br/> Intensidade de trafego: " + roinfinito + "<br/> Número médio de clientes no sistema: " + en3 + "<br/> Tempo médio de resposta: " + es3;
            break;

        case '4':
            let Ro4 = Ro_4(Y,U);
            let Pb4 = pb_4(Ro4, B);
            let En4 = En_4(Ro4,B);
            let Enw4 = Enw_4(Ro4, B);
            let Y4 = parseFloat(Y_4(Y,N,B));
            let Utilizacao4 = utilizacao_4(Ro4, Pb4);
            let Po4 = po_4(Ro4,B);
            let Pn4 = pn_4(N, Ro4, B);
            let Yi4 = Yi_4(Y, Pb4);
            let Perda4 = taxa_de_perda_4(Y, Pb4);
            let Es4 = Es_4(En4, Y, Pb4);
            let Ew4 = Ew_4(Enw4, Y, Pb4);

            var ro4 = Ro4.toFixed(4);
            var pb4 = Pb4.toFixed(4);
            var en4 = En4.toFixed(4);
            var enw4 = Enw4.toFixed(4);
            var y4 = Y4.toFixed(4);
            var utilizacao4 = Utilizacao4.toFixed(4);
            var po4 = Po4.toFixed(4);
            var pn4 = Pn4.toFixed(4);
            var yi4 = Yi4.toFixed(4);
            var perda4 = Perda4.toFixed(4);
            var es4 = Es4.toFixed(4);
            var ew4 = Ew4.toFixed(4);

            NomeFila = "Capacidade finita";
            Id_Fila = 4;
            Dados = "Intensidade de trafego: " + ro4 + "<br/> Probabilidade de o sistema estar totalmente cheio: " + pb4 + "<br/> Número médio de usuários no Sistema: " + en4 + "<br/> Número médio de usuários na fila: " + enw4 + "<br/> Taxa de chegadas: " + y4 + "<br/> Utilização do servidor: " + utilizacao4 + "<br/> Probabilidade de nenhum usuário no sistema: " + po4 + "<br/> Probabilidade de ter n ou mais requisições no sistema: " + pn4 + "<br/> Taxa Efetiva de Chegada: " + yi4 + "<br/> Taxa de perda: " + perda4 + "<br/> Tempo médio de resposta: " + es4 + "<br/> Tempo médio de espera: " + ew4; 
            break;

        case '5':
            let Ro5 = Ro_5(Y, U, M);
            let Po5 = po_5(Ro5, B, M); 
            let Pn5 = pn_5(N, Y, U, B, M, Po5);
            let Pb5 = pb_5(Ro5, B);
            let En5 = En_5(B, Pn5);
            let Enw5 = Enw_5(B, M, Pn5);
            let Y5 = parseFloat(Y_5(Y,N,B));
            let Utilizacao5 = utilizacao_5(Ro5, Pb5);
            let Yi5 = Yi_5(Y, Pb5);
            let Taxadeperda5 = taxa_de_perda_5(Y, Pb5);
            let Es5 = Es_5(En5, Y, Pb5);
            let Ew5 = Ew_5(Enw5, Y, Pb5);

            var ro5 = Ro5.toFixed(4);
            var po5 = Po5.toFixed(4);
            var pn5 = Pn5.toFixed(4);
            var pb5 = Pb5.toFixed(4);
            var en5 = En5.toFixed(4);
            var enw5 = Enw5.toFixed(4);
            var y5 = Y5.toFixed(4);
            var utilizacao5 = Utilizacao5.toFixed(4);
            var yi5 = Yi5.toFixed(4);
            var taxadeperda5 = Taxadeperda5.toFixed(4);
            var es5 = Es5.toFixed(4);
            var ew5 = Ew5.toFixed(4);

            NomeFila = "M-servidores com capacidade infinita";
            Id_Fila = 5;
            Dados = "Intensidade de trafego: " + ro5 + "<br/> Probabilidade de nenhum usuário no sistema: " + po5 + "<br/> Probabilidade de ter n ou mais requisições no sistema: " + pn5 + "<br/> Probabilidade de o sistema estar totalmente cheio: " + pb5 + "<br/> Número médio de requisições no Sistema: " + en5 + "<br/> Número médio de requisições na fila: " + enw5 + "<br/> Taxa de chegada: " + y5 + "<br/> Utilização do servidor: " + utilizacao5 + "<br/> Taxa Efetiva de Chegada: " + yi5 + "<br/> Taxa De Perda: " + taxadeperda5 + "<br/> Tempo médio de resposta para uma requisição: " + es5 + "<br/> Tempo médio de espera na fila de uma requisição: " + ew5;
            break;

        case '6':
            let Ro6 = ro_6(Y,U);
            let Po6 = po_6(Y, K, U, N);
            let Enw6 = Enw_6(K, Y, U, Po6);
            let En6 = En_6(Enw6, Po6);
            let Ew6 = Ew_6(Enw6, Y, K, En6);
            let Y6 = Y_6(Y,K,N);
            let Utilizacao6 = utilizacao_6(K, Ro6, En6);
            let Pn6 = pn_6(Y, K, U, N, Po6);
            let Yi6 = Yi_6(U, Po6);
            let Es6 = parseFloat(Es_6(Ew6, U));

            var ro6 = Ro6.toFixed(4);
            var po6 = Po6.toFixed(4);
            var enw6 = Enw6.toFixed(4);
            var en6 = En6.toFixed(4);
            var ew6 = Ew6.toFixed(4);
            var y6 = Y6.toFixed(4);
            var utilizacao6 = Utilizacao6.toFixed(4);
            var pn6 = Pn6.toFixed(4);
            var yi6 = Yi6.toFixed(4);
            var es6 = Es6.toFixed(4);

            NomeFila = "População finita com um servidor";
            Id_Fila = 6;
            Dados = "Intensidade de trafego: " + ro6 + "<br/> Probabilidade de nenhum usuário no sistema: " + po6 + "<br/> Número médio de requisições na fila: " + enw6 + "<br/> Número médio de requisições no Sistema: " + en6 + "<br/> Tempo médio de espera na fila de uma requisição: " + ew6 + "Taxa de chegada: " + y6 + "<br/> Utilização do servidor: " + utilizacao6 + "<br/> Probabilidade de ter n ou mais requisições no sistema: " + pn6 + "<br/> Taxa Efetiva de Chegada: " + yi6 + "<br/> Tempo médio de resposta para uma requisição: " + es6;
            break;

        case '7':
            let Un7 = un_7(N,U);
            let P7= p_7(K,Y,U);
            let En7 = en_7(K,Y,U);

            var un7 = Un7.toFixed(4);
            var p7 = P7.toFixed(4);
            var en7 = En7.toFixed(4);

            NomeFila = "População finita com infinitos servidores";
            Id_Fila = 7;
            Dados = "Taxa de serviço: " + un7 + "<br/> Intensidade de tráfego: " +  p7 + "<br/> Número médio de clientes no sistema: " + en7; 
            break;

        case '8':
            let Yn8_ = Yn8(Y,K,N,B);
            let Un8_ = Un8(N,U,M);
            let Pn8_ = Pn8(Y,U,K,N,M,P0);
            let Ro8_ = Ro8(Y,M,U);
            let Utlizacao8_ = Utlizacao8(Y,M,N,U,K,B,P0);
            let En8_ = En8(M,N,K,Y,U,P0);
            let Ew8_ = Ew8(M,N,K,Y,U,B,P0);
            let Es8_ = Es8(M,N,K,Y,U,B,P0);
            let Y_chegada8_ = Y_chegada8(M,N,K,Y,U,P0);

            var yn8 = Yn8_.toFixed(4);
            var un8 = Un8_.toFixed(4);
            var pn8 = Pn8_.toFixed(4);
            var ro8 = Ro8_.toFixed(4);
            var utlizacao8 = Utlizacao8_.toFixed(4);
            var en8 = En8_.toFixed(4);
            var ew8 = Ew8_.toFixed(4);
            var es8 = Es8_.toFixed(4);
            var y_chegada8 = Y_chegada8_.toFixed(4);

            NomeFila = "M-servidores com capacidade e população finitos";
            Id_Fila = 8;
            Dados = "Taxa de Chegada: " + yn8 + "<br/> Taxa de Serviço: " + un8 + "<br/> Probabilidade de ter n ou mais requisições no sistema: " + pn8 + "<br/> Intensidade de trafego: " + ro8 + "<br/> Utilização do servidor: " + utlizacao8 + "<br/> Número médio de requisições no Sistema: " + en8 + "<br/> Tempo médio de espera na fila de uma requisição: " + ew8 + "<br/> Tempo médio de resposta para uma requisição: " + es8 + "<br/> Taxa Efetiva de Chegada: " + y_chegada8;
            break;

        default:
            alert("Selecione uma fila!");
            
    }
}

export function FazerPrint()
{
    return "Valores Inseridos!" + ValoresInseridos + "<br/><br/>Resultado! <br/> " + Dados;
}

export function GuardarDados()
{
    return "<br/>Valores Inseridos!" + ValoresInseridos;
}

export function GuardarResultado()
{
    return "<br/><br/>Resultado! <br/> " + Dados;
}

export function Nome_da_fila()
{
    return NomeFila;
}