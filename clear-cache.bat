@echo off
echo Clearing Next.js cache and build artifacts...

if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo Cache cleared successfully!
echo Please rebuild your application with: npm run build
pause
