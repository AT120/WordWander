FROM mcr.microsoft.com/dotnet/sdk:7.0 AS builder
WORKDIR /src
COPY . /src
RUN dotnet publish -o /build


FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=builder /build /app
ENTRYPOINT './WordWanderBackend.Main'