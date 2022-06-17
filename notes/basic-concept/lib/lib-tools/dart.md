You can use `pub` to manage Dart packages.

```yaml
# pubspec.yaml
name: my_app
dependencies:
  js: ^0.3.0
  intl: ^0.12.4
```

```sh
# Installing packages
cd <path-to-my_app>
pub get

# Upgrading a dependency
pub upgrade
# 升级特定的依赖
pub upgrade transmogrify
```
