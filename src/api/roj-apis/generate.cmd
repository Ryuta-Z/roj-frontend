@echo off
setlocal enabledelayedexpansion

REM ��������URLģ��
set INPUT_URL_TEMPLATE=http:\\39.101.78.42:8093\api\[REPLACE]\v2\api-docs

REM ����HTTP�ͻ��ˣ�����ʹ��axios��
set HTTP_CLIENT=axios

REM ����Ҫ���ɵ�API��������
set API_TYPES=user contest question judge sandbox

REM ����API��������
for %%t in (%API_TYPES%) do (
    REM �������������URL
    set INPUT_URL=!INPUT_URL_TEMPLATE:[REPLACE]=%%t!
    
    REM �������Ŀ¼
    set OUTPUT_DIR=.\%%tApi

    REM ����openapi���ɴ���
    echo openapi --input !INPUT_URL! --output !OUTPUT_DIR! --client %HTTP_CLIENT% |cmd

    echo ���ɽ���� !OUTPUT_DIR!
)

echo ����API�������������

