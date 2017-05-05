#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

chmod 600 gh-travis_rsa
eval `ssh-agent -s`
ssh-add gh-travis_rsa

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy."
    exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# first clone the repo and do the build. Build will be in ./build/
git clone $REPO api

# Build the console out of the latest API release.
echo "Building the console..."
node ./build.js || exit 1

# Now, the build is in ./build/ folder.
# But we have to copy it to ./api/ folder after changing branch to gh-pages
echo "Updating gh-pages branch..."
cd api
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf api/**/* || exit 0

# Copy the new console
cp -a build/. api/

# Now let's go have some fun with the cloned repo
cd api
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled api (e.g. this is a README update) then just bail.
if git diff --quiet; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

echo "Deploying..."
# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add -A .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH
