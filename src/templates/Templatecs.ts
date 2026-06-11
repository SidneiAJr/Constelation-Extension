// templates/TemplateCSharp.ts
import * as fs from 'fs';
import * as path from 'path';

export async function generateCSharpProject(projectPath: string, projectName: string) {
    
    // ================================
    // ARQUIVOS APENAS (sem criar pastas)
    // A estrutura de pastas vem do TemplateStructure
    // ================================

    // .csproj
    const csproj = `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
    <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="8.0.0" />
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
    <PackageReference Include="BCrypt.Net-Next" Version="4.0.3" />
  </ItemGroup>
</Project>`;
    fs.writeFileSync(path.join(projectPath, `${projectName}.csproj`), csproj);

    // Program.cs
    const program = `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.Run();`;
    fs.writeFileSync(path.join(projectPath, 'Program.cs'), program);

    // appsettings.json
    const appsettings = `{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=meu_banco;User=root;Password=root;"
  },
  "Jwt": {
    "Secret": ""
  },
  "AllowedHosts": "*"
}`;
    fs.writeFileSync(path.join(projectPath, 'appsettings.json'), appsettings);

    // .env
    const env = `DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=meu_banco
JWT_SECRET=`;
    fs.writeFileSync(path.join(projectPath, '.env'), env);
    fs.writeFileSync(path.join(projectPath, '.env.example'), env);

    // .gitignore
    const gitignore = `bin/
obj/
*.user
*.suo
.env
appsettings.Development.json`;
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

    // Dockerfile
    const dockerfile = `FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
EXPOSE 80
ENTRYPOINT ["dotnet", "${projectName}.dll"]`;
    fs.writeFileSync(path.join(projectPath, 'Dockerfile'), dockerfile);

    // README.md
    const readme = `# ${projectName}

## Backend C# ASP.NET Core

### Rodar
\`\`\`bash
dotnet run
\`\`\`

### Docker
\`\`\`bash
docker build -t ${projectName} .
docker run -p 8080:80 ${projectName}
\`\`\`

---
Gerado com Constellation CLI
`;
    fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
}