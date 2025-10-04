{
  description = "Portfolio API with Prisma";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs
          pkgs.nodePackages.npm      # untuk install node modules
          pkgs.openssl_1_1           # Prisma butuh OpenSSL 1.1.x
          pkgs.postgresql
        ];

        shellHook = ''
          export LD_LIBRARY_PATH=${pkgs.openssl_1_1}/lib:$LD_LIBRARY_PATH
          echo "Development shell ready: Node.js, Prisma, PostgreSQL, OpenSSL set"
        '';
      };
    };
}
