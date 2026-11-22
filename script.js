/* EtilikServ - Ecran de chargement officiel Garry's Mod.
 * Les fonctions ci-dessous sont appelees directement par le jeu.
 * Pas de statistiques inventees : une progression numerique apparait
 * seulement quand le jeu fournit les compteurs de fichiers.
 */
(function () {
  'use strict';

  var status = document.getElementById('status');
  var map = document.getElementById('map');
  var gamemode = document.getElementById('gamemode');
  var percent = document.getElementById('percent');
  var files = document.getElementById('files');
  var filename = document.getElementById('filename');
  var track = document.getElementById('progress-track');
  var fill = document.getElementById('progress-fill');
  var total = 0;
  var needed = null;

  function clean(value) { return String(value || '').trim(); }
  function updateProgress() {
    if (total <= 0 || needed === null) return;
    var loaded = Math.max(0, Math.min(total, total - needed));
    var pct = Math.round(loaded * 100 / total);
    track.className = 'track has-progress';
    track.setAttribute('aria-valuenow', String(pct));
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', '100');
    fill.style.width = pct + '%';
    percent.textContent = pct + ' %';
    files.textContent = loaded + ' / ' + total + ' fichiers téléchargés';
  }

  window.GameDetails = function (serverName, serverURL, mapName, maxPlayers, steamID, gameMode) {
    if (clean(mapName)) map.textContent = clean(mapName);
    if (clean(gameMode)) gamemode.textContent = clean(gameMode);
  };
  window.SetFilesTotal = function (count) {
    total = Math.max(0, Number(count) || 0);
    needed = null;
    files.textContent = total ? total + ' fichiers à télécharger' : 'Préparation des ressources…';
  };
  window.SetFilesNeeded = function (count) {
    needed = Math.max(0, Number(count) || 0);
    updateProgress();
  };
  window.DownloadingFile = function (name) {
    var path = clean(name);
    filename.textContent = path ? path.split('/').pop().slice(0, 72) : 'Téléchargement des ressources';
    status.textContent = 'Téléchargement des ressources du serveur…';
  };
  window.SetStatusChanged = function (message) {
    if (clean(message)) status.textContent = clean(message);
  };

  /* Prévisualisation locale (aucun effet sur le chargement réel). */
  try {
    var query = new URLSearchParams(window.location.search);
    var shownMap = query.get('map') || query.get('Map');
    if (shownMap) map.textContent = shownMap.slice(0, 80);
  } catch (ignore) {}
})();
