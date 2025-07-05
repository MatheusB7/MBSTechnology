#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <windows.h>

void limparTela() {
    system("cls");
}

void mostrarAgradecimento() {
    printf("\n\n==============================================\n");
    printf("Obrigado por usar o Gerador de Senhas Seguras\n");
    printf("             da MBS Technology!\n");
    printf("==============================================\n");
    printf("\nDireitos Autorais: Matheus Barbosa da Silva - MBS Technology\n\n");
}

int validarCodigo(char *codigoDigitado) {
    time_t t = time(NULL);
    struct tm tm = *localtime(&t);

    int mes = tm.tm_mon + 1;
    int ano = tm.tm_year + 1900;
    int diferencaAno = ano - 2025;
    int base = 29042904 + (diferencaAno * 10001001);
    int resultado = base * mes;

    char codigoCorreto[20];
    sprintf(codigoCorreto, "MBS%d", resultado);

    return strcmp(codigoDigitado, codigoCorreto) == 0;
}

void salvarSenhaEmArquivo(const char *senha) {
    time_t t = time(NULL);
    struct tm tm = *localtime(&t);
    char nomeArquivo[200];
    char caminhoDesktop[300];

    sprintf(caminhoDesktop, "C:\\Users\\%s\\Desktop", getenv("USERNAME"));
    sprintf(nomeArquivo, "%s\\Senha - MBS Technology - %02d-%04d.txt", caminhoDesktop, tm.tm_mon + 1, tm.tm_year + 1900);

    FILE *arquivo = fopen(nomeArquivo, "a");
    if (arquivo != NULL) {
        fprintf(arquivo, "Senha gerada: %s\n", senha);
        fclose(arquivo);
        printf("\n[SALVO] Senha salva com sucesso no arquivo:\n\"%s\"\n", nomeArquivo);
        Sleep(4000);
    } else {
        printf("[ERRO] Não foi possível salvar a senha no arquivo.\n");
    }
}

void gerarSenha(int premium) {
    int tamanho = 8;

    if (premium) {
        printf("\n===================================\n");
        printf("Quantos caracteres (entre 8 e 20)? ");
        scanf("%d", &tamanho);
        if (tamanho < 8) tamanho = 8;
        if (tamanho > 20) tamanho = 20;
    }

    const char *minusculas = "abcdefghijklmnopqrstuvwxyz";
    const char *maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const char *numeros = "0123456789";
    const char *simbolos = "!@#$%&*";

    char todos[100] = "";
    strcat(todos, minusculas);
    strcat(todos, numeros);
    if (premium) {
        strcat(todos, maiusculas);
        strcat(todos, simbolos);
    }

    srand((unsigned int)time(NULL));
    char senha[25] = "";

    if (premium) {
        senha[0] = maiusculas[rand() % strlen(maiusculas)];
        senha[1] = simbolos[rand() % strlen(simbolos)];
        senha[2] = numeros[rand() % strlen(numeros)];

        for (int i = 3; i < tamanho; i++) {
            senha[i] = todos[rand() % strlen(todos)];
        }

        for (int i = 0; i < tamanho; i++) {
            int j = rand() % tamanho;
            char temp = senha[i];
            senha[i] = senha[j];
            senha[j] = temp;
        }
    } else {
        for (int i = 0; i < tamanho; i++) {
            senha[i] = todos[rand() % strlen(todos)];
        }
    }

    senha[tamanho] = '\0';

    printf("\n=========================\n");
    printf("[SENHA GERADA] %s\n", senha);
    printf("=========================\n");

    char salvar;
    printf("\nDeseja salvar a senha automaticamente na área de trabalho? (s/n): ");
    scanf(" %c", &salvar);

    if (salvar == 's' || salvar == 'S') {
        salvarSenhaEmArquivo(senha);
    } else {
        printf("\n[INFO] Senha não salva.\n");
    }
}

int main() {
    SetConsoleOutputCP(CP_UTF8); // Habilita UTF-8 no terminal
    limparTela();

    printf("=============================================\n");
    printf("         Gerador de Senhas Seguras\n");
    printf("             MBS Technology\n");
    printf("=============================================\n");

    printf("\nModos disponíveis:\n\n");

    printf("Modo Gratuito (Free):\n");
    printf("-> Gera senha com 8 caracteres\n");
    printf("-> Usa apenas letras minúsculas e números\n\n");

    printf("Modo Premium (Pago):\n");
    printf("-> Solicita um código de ativação\n");
    printf("-> Se o código estiver correto:\n");
    printf("   - Permite senha com 8 a 20 caracteres\n");
    printf("   - Inclui letras maiúsculas, números e símbolos obrigatoriamente\n\n");

    int opcao;
    printf("Escolha o modo de geração de senha:\n");
    printf("=============================================================\n");
    printf("[1] Modo Grátis    -> Senha simples (letras minúsculas e números)\n");
    printf("[2] Modo Premium   -> Senha forte com símbolos e letras maiúsculas\n");
    printf("=============================================================\n");
    printf("Digite sua opção: ");
    scanf("%d", &opcao);

    if (opcao == 1) {
        gerarSenha(0);
    } else if (opcao == 2) {
        int tentativas = 3;
        int codigoValido = 0;

        while (tentativas > 0) {
            char codigo[30];
            printf("\nDigite o código de ativação (ex: MBS116171616): ");
            scanf("%s", codigo);

            if (validarCodigo(codigo)) {
                printf("\nVerificando o código...\n");
                Sleep(2000);
                printf("\n[OK] Código válido. Acesso ao modo premium liberado!\n");
                codigoValido = 1;
                gerarSenha(1);
                break;
            } else {
                tentativas--;
                printf("[ERRO] Código inválido. Tentativas restantes: %d\n", tentativas);
            }
        }

        if (!codigoValido) {
            limparTela();
            printf("\n=============================================\n");
            printf("Número de tentativas excedido.\n");
            printf("Entre em contato para resolver o problema:\n");
            printf("Email: mbstechnology@gmail.com\n");
            printf("WhatsApp: (41) 99999-9999\n");
            printf("=============================================\n");
            mostrarAgradecimento();
            system("pause");
            exit(0);
        }
    } else {
        printf("[ERRO] Opção inválida. Encerrando...\n");
        mostrarAgradecimento();
        system("pause");
        exit(0);
    }

    mostrarAgradecimento();
    system("pause");
    return 0;
}
