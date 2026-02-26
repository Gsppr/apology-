param(
    [Parameter(Mandatory = $true)]
    [string]$RepoName,

    [ValidateSet("public", "private")]
    [string]$Visibility = "public",

    [string]$CommitMessage = "Initial commit",

    [string]$GitHubUser
)

$ErrorActionPreference = "Stop"

function Require-Command {
    param([string]$Name)
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Required command '$Name' was not found. Please install it first."
    }
}

function Run-Git {
    param([string[]]$Args)
    & git @Args
    if ($LASTEXITCODE -ne 0) {
        throw "git command failed: git $($Args -join ' ')"
    }
}

function Run-Gh {
    param([string[]]$Args)
    & gh @Args
    if ($LASTEXITCODE -ne 0) {
        throw "gh command failed: gh $($Args -join ' ')"
    }
}

Require-Command git
Require-Command gh

$gitName = git config --get user.name
$gitEmail = git config --get user.email

if ([string]::IsNullOrWhiteSpace($gitName) -or [string]::IsNullOrWhiteSpace($gitEmail)) {
    throw "Git identity is not configured. Run: git config --global user.name 'Your Name' and git config --global user.email 'you@example.com'"
}

$authStatus = gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    throw "GitHub CLI is not authenticated. Run: gh auth login"
}

if (-not (Test-Path ".git")) {
    Run-Git @("init")
}

Run-Git @("branch", "-M", "main")
Run-Git @("add", ".")

$staged = git diff --cached --name-only
if (-not [string]::IsNullOrWhiteSpace(($staged -join ""))) {
    Run-Git @("commit", "-m", $CommitMessage)
} else {
    Write-Host "No staged changes to commit."
}

$originUrl = git remote get-url origin 2>$null
$hasOrigin = ($LASTEXITCODE -eq 0 -and -not [string]::IsNullOrWhiteSpace($originUrl))

if (-not $hasOrigin) {
    Run-Gh @("repo", "create", $RepoName, "--$Visibility", "--source", ".", "--remote", "origin", "--push")
} else {
    Run-Git @("push", "-u", "origin", "main")
}

if ([string]::IsNullOrWhiteSpace($GitHubUser)) {
    $GitHubUser = gh api user --jq ".login"
}

if (-not [string]::IsNullOrWhiteSpace($GitHubUser)) {
    Write-Host ""
    Write-Host "Expected live URL after Pages deploy completes:"
    Write-Host "https://$GitHubUser.github.io/$RepoName/"
    Write-Host ""
}

Write-Host "Done. If this is your first deploy, confirm repo Pages source is set to GitHub Actions in Settings > Pages."
