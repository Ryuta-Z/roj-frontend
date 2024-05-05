@echo off
setlocal enabledelayedexpansion

REM 设置输入URL模板
set INPUT_URL_TEMPLATE=http:\\39.101.78.42:8093\api\[REPLACE]\v2\api-docs

REM 设置HTTP客户端（这里使用axios）
set HTTP_CLIENT=axios

REM 定义要生成的API类型数组
set API_TYPES=user contest question judge sandbox

REM 遍历API类型数组
for %%t in (%API_TYPES%) do (
    REM 构建具体的输入URL
    set INPUT_URL=!INPUT_URL_TEMPLATE:[REPLACE]=%%t!
    
    REM 设置输出目录
    set OUTPUT_DIR=.\%%tApi

    REM 调用openapi生成代码
    echo openapi --input !INPUT_URL! --output !OUTPUT_DIR! --client %HTTP_CLIENT% |cmd

    echo 生成结果到 !OUTPUT_DIR!
)

echo 所有API代码已生成完成

