import * as fs from 'fs';
import * as path from 'path';


export async function generateCSharpProject(projectPath: string, projectName: string) {
    // .csproj
    const csproj = `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>`;
    fs.writeFileSync(path.join(projectPath, `${projectName}.csproj`), csproj);

    // Program.cs
    const programContent = `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => Results.Json(new { message = "Hello World" }));

app.Run();`;
    fs.writeFileSync(path.join(projectPath, 'Program.cs'), programContent);

    // appsettings.json
    const appsettings = `{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}`;
    fs.writeFileSync(path.join(projectPath, 'appsettings.json'), appsettings);

    // Controllers
    const controllersCs = ['HomeController.cs', 'UserController.cs', 'AuthController.cs'];
    const controllersPathCs = path.join(projectPath, 'Controllers');
    fs.mkdirSync(controllersPathCs, { recursive: true });
    controllersCs.forEach(file => {
        fs.writeFileSync(path.join(controllersPathCs, file), `// ${file}\n`);
    });

    // Models
    const modelsCs = ['User.cs', 'Product.cs'];
    const modelsPathCs = path.join(projectPath, 'Models');
    fs.mkdirSync(modelsPathCs, { recursive: true });
    modelsCs.forEach(file => {
        fs.writeFileSync(path.join(modelsPathCs, file), `// ${file}\n`);
    });

    // Services
    const servicesCs = ['IUserService.cs', 'UserService.cs', 'IAuthService.cs', 'AuthService.cs'];
    const servicesPathCs = path.join(projectPath, 'Services');
    fs.mkdirSync(servicesPathCs, { recursive: true });
    servicesCs.forEach(file => {
        fs.writeFileSync(path.join(servicesPathCs, file), `// ${file}\n`);
    });

    // Repositories
    const repositoriesCs = ['IUserRepository.cs', 'UserRepository.cs', 'IProductRepository.cs', 'ProductRepository.cs'];
    const reposPathCs = path.join(projectPath, 'Repositories');
    fs.mkdirSync(reposPathCs, { recursive: true });
    repositoriesCs.forEach(file => {
        fs.writeFileSync(path.join(reposPathCs, file), `// ${file}\n`);
    });

    // DTOs
    const dtosCs = ['UserRequestDTO.cs', 'UserResponseDTO.cs', 'AuthRequestDTO.cs', 'AuthResponseDTO.cs'];
    const dtoPathCs = path.join(projectPath, 'DTOs');
    fs.mkdirSync(dtoPathCs, { recursive: true });
    dtosCs.forEach(file => {
        fs.writeFileSync(path.join(dtoPathCs, file), `// ${file}\n`);
    });

    // Frontend (wwwroot)
    const htmlFilesCs = ['index.html', 'about.html', 'contact.html'];
    const wwwrootPath = path.join(projectPath, 'wwwroot');
    fs.mkdirSync(wwwrootPath, { recursive: true });
    htmlFilesCs.forEach(file => {
        fs.writeFileSync(path.join(wwwrootPath, file), `<!-- ${file} -->\n`);
    });

    const cssFilesCs = ['style.css', 'responsive.css'];
    const cssPathCs = path.join(projectPath, 'wwwroot/css');
    fs.mkdirSync(cssPathCs, { recursive: true });
    cssFilesCs.forEach(file => {
        fs.writeFileSync(path.join(cssPathCs, file), `/* ${file} */\n`);
    });

    const jsFilesCs = ['main.js', 'api.js'];
    const jsPathCs = path.join(projectPath, 'wwwroot/js');
    fs.mkdirSync(jsPathCs, { recursive: true });
    jsFilesCs.forEach(file => {
        fs.writeFileSync(path.join(jsPathCs, file), `// ${file}\n`);
    });

    fs.mkdirSync(path.join(projectPath, 'wwwroot/images'), { recursive: true });
}

