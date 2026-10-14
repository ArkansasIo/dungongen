# D20QL Authentication, Permissions & Administration
D20QL server mode uses role and permission checks.
Roles: superadmin, admin, gamemaster, player, spectator.
Permissions include users.read, users.write, users.disable, roles.write, settings.read, settings.write, campaigns.create, campaigns.manage, campaigns.join, campaigns.play, campaigns.moderate, characters.write, worlds.generate, turns.resolve, server.audit, server.shutdown.
Campaign membership is separate from global roles.
Passwords must be stored as strong hashes, never plaintext. Sessions must be revocable and privileged mutations audited. GitHub Pages must never contain database credentials or signing secrets.

Example:
USER "stephen" {
  EMAIL "player@example.invalid"
  ROLE "player"
  SETTING "theme" "dark"
  SETTING "diceAnimation" true
}
