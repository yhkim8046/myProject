# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0-focal AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["my-app/backend/backend.csproj", "backend/"]
WORKDIR /src/backend
RUN dotnet restore

# Copy the rest of the code and build the application
COPY my-app/backend/ .
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0-focal
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]
