# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source


# copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore


# copy everything else and build app
COPY . ./
RUN dotnet publish -c release -o /zofyamanagementmvc


# final stage/image
FROM mcr.microsoft.com/dotnet/nightly/aspnet:6.0
WORKDIR /zofyamanagementmvc
COPY --from=build /zofyamanagementmvc ./
ENTRYPOINT ["dotnet", "ZofyaManagementMVC.dll"]