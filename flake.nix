{
  description = "Dev environment for api-portfolio-next with Node.js 22";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }: {
    devShells.default = let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
    in pkgs.mkShell {
      buildInputs = [
        pkgs.nodejs_22
        pkgs.yarn
        pkgs.typescript
      ];

      shellHook = ''
        echo "🚀 Node.js $(node -v) ready for development!"
        export NODE_ENV=development
      '';
    };
  };
}
