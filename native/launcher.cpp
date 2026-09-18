// Optional native launcher built by GitHub Actions.
// FastAccses uses Electron's safe shell bridge at runtime; this helper is
// provided for native integrations and future extensions.
#include <cstdlib>
#include <iostream>
#include <string>

int main(int argc, char** argv) {
    if (argc < 2) { std::cerr << "Usage: fastaccses-launcher <path>\n"; return 2; }
    std::string target = argv[1];
#ifdef _WIN32
    std::string command = "start \"\" \"" + target + "\"";
#elif __APPLE__
    std::string command = "open \"" + target + "\"";
#else
    std::string command = "xdg-open \"" + target + "\"";
#endif
    return std::system(command.c_str());
}
