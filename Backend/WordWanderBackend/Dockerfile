FROM mcr.microsoft.com/dotnet/sdk:7.0 AS builder
WORKDIR /src

COPY *.sln .
COPY WordWanderBackend.Main/WordWanderBackend.Main.csproj ./WordWanderBackend.Main/WordWanderBackend.Main.csproj
COPY WordWanderBackend.Main.BL/WordWanderBackend.Main.BL.csproj ./WordWanderBackend.Main.BL/WordWanderBackend.Main.BL.csproj
COPY WordWanderBackend.Main.Common/WordWanderBackend.Main.Common.csproj ./WordWanderBackend.Main.Common/WordWanderBackend.Main.Common.csproj
COPY WordWanderBackend.Main.DAL/WordWanderBackend.Main.DAL.csproj ./WordWanderBackend.Main.DAL/WordWanderBackend.Main.DAL.csproj
RUN dotnet restore

COPY . /src
RUN dotnet publish -o /build


FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=builder /build /app
ENTRYPOINT './WordWanderBackend.Main'