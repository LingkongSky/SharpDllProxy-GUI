#define QT_VERSION_MAJOR 5
#define QT_VERSION_MINOR 15
#define QT_VERSION_PATCH 5

#include "pch.h"
#include <windows.h>
#include <shlobj.h>
#include <string>
#include <vector>
#include <filesystem>
#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <detours.h>
#include <fstream>
#include <sstream>
#include <WinInet.h>
#include <commdlg.h>
#include <QtCore/qstring.h>
#include <QtOpenGL/qgl.h>

#pragma comment(lib, "detours.lib")

#define _CRT_SECURE_NO_DEPRECATE
#pragma warning(disable : 4996)

#pragma comment(linker, "/export:?renderText@QGLWidget@QT@@QEAAXNNNAEBVQString@2@AEBVQFont@2@@Z=tmpB458.?renderText@QGLWidget@QT@@QEAAXNNNAEBVQString@2@AEBVQFont@2@@Z,@499")

typedef void(__fastcall *OriginalFunctionType)(QGLWidget *, double, double, double, const struct QString *, const struct QFont *);
OriginalFunctionType originalFunction = nullptr;

void __fastcall MyFunction(QGLWidget *a1, double a2, double a3, double a4, const struct QString *a5, const struct QFont *a6)
{
    HWND hwnd = GetActiveWindow();
    MessageBox(NULL, L"DLL HOOK", L"Tips", MB_OK);
    originalFunction(a1, a2, a3, a4, a5, a6);
}


BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved)
{
    if (ul_reason_for_call == DLL_PROCESS_ATTACH)
    {

        // Get the address of the original function
        originalFunction = (void(__fastcall *)(QGLWidget *, double, double, double, const struct QString *, const struct QFont *))GetProcAddress(GetModuleHandle(L"Qt5OpenGLQT"), "?renderText@QGLWidget@QT@@QEAAXNNNAEBVQString@2@AEBVQFont@2@@Z");
        if (originalFunction != nullptr)
        {
            // Detour the original function
            DetourRestoreAfterWith();
            DetourTransactionBegin();
            DetourUpdateThread(GetCurrentThread());
            DetourAttach(&(PVOID &)originalFunction, MyFunction);

            DetourTransactionCommit();
        }
    }
    else if (ul_reason_for_call == DLL_PROCESS_DETACH)
    {
        // Restore the original function
        if (originalFunction != nullptr)
        {
            DetourRestoreAfterWith();
            DetourTransactionBegin();
            DetourUpdateThread(GetCurrentThread());
            DetourDetach(&(PVOID &)originalFunction, MyFunction);
            DetourTransactionCommit();
        }
    }

    return TRUE;
}
