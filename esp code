local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")
local TweenService = game:GetService("TweenService")
local Camera = game:GetService("Workspace").CurrentCamera
local LocalPlayer = Players.LocalPlayer

local boxEnabled = true
local distanceEnabled = true
local healthEnabled = true
local nameEnabled = true
local uiVisible = true

local espObjects = {}


local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Parent = game.CoreGui
ScreenGui.ResetOnSpawn = false

local MainFrame = Instance.new("Frame")
MainFrame.Size = UDim2.new(0, 350, 0, 250)
MainFrame.Position = UDim2.new(0.1, 0, 0.1, 0)
MainFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
MainFrame.BackgroundTransparency = 0.2
MainFrame.BorderSizePixel = 0
MainFrame.Active = true
MainFrame.Draggable = true
MainFrame.Parent = ScreenGui

local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, 0, 0, 30)
Title.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
Title.Text = "ESP Menu  [INS] to Hide/Show"
Title.TextColor3 = Color3.fromRGB(255, 255, 255)
Title.Font = Enum.Font.SourceSansBold
Title.TextSize = 20
Title.Parent = MainFrame


local function removeESP(player)
    if espObjects[player] then
        espObjects[player].box:Remove()
        espObjects[player].name:Remove()
        espObjects[player].text:Remove()
        espObjects[player].health:Remove()
        espObjects[player] = nil
    end
end

local function updateESP()
    for player, esp in pairs(espObjects) do
        if player ~= LocalPlayer and player.Character then
            local char = player.Character
            local rootPart = char:FindFirstChildWhichIsA("BasePart")
            local head = char:FindFirstChild("Head") or rootPart
            local humanoid = char:FindFirstChildOfClass("Humanoid")

            if rootPart and head and humanoid then
                local box, nameText, text, healthBar = esp.box, esp.name, esp.text, esp.health

                local headPos, headOnScreen = Camera:WorldToViewportPoint(head.Position + Vector3.new(0, 0.5, 0))
                local footPos, footOnScreen = Camera:WorldToViewportPoint(rootPart.Position - Vector3.new(0, 3, 0))

                if headOnScreen and footOnScreen then
                    local distance = (Camera.CFrame.Position - rootPart.Position).Magnitude
                    local boxHeight = (footPos - headPos).Y
                    local boxWidth = boxHeight / 2.2

                    box.Position = Vector2.new(headPos.X - boxWidth / 2, headPos.Y)
                    box.Size = Vector2.new(boxWidth, boxHeight)
                    box.Visible = boxEnabled

                    nameText.Text = player.Name
                    nameText.Position = Vector2.new(headPos.X, headPos.Y - 35)
                    nameText.Visible = nameEnabled

                    text.Text = string.format("%.1f m", distance)
                    text.Position = Vector2.new(headPos.X, headPos.Y - 18)
                    text.Visible = distanceEnabled

                    local healthPercent = humanoid.Health / humanoid.MaxHealth
                    local barHeight = math.max(1, boxHeight * healthPercent)
                    local barX = box.Position.X - 6
                    local barY = box.Position.Y + (boxHeight - barHeight)

                    healthBar.From = Vector2.new(barX, box.Position.Y + boxHeight)
                    healthBar.To = Vector2.new(barX, barY)
                    healthBar.Color = Color3.fromRGB(255 * (1 - healthPercent), 255 * healthPercent, 50)
                    healthBar.Visible = healthEnabled
                end
            end
        end
    end
end

local function createButton(text, position, callback)
    local button = Instance.new("TextButton")
    button.Size = UDim2.new(0.45, 0, 0, 40)
    button.Position = position
    button.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
    button.BackgroundTransparency = 0.1
    button.TextColor3 = Color3.fromRGB(255, 255, 255)
    button.Text = text
    button.Font = Enum.Font.SourceSans
    button.TextSize = 18
    button.BorderSizePixel = 0
    button.AutoButtonColor = true
    button.Parent = MainFrame
    
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 10)
    corner.Parent = button
    
    button.MouseButton1Click:Connect(callback)
    return button
end

local toggleBox = createButton("Toggle Box", UDim2.new(0.05, 0, 0.2, 0), function()
    boxEnabled = not boxEnabled
end)

local toggleDistance = createButton("Toggle Distance", UDim2.new(0.55, 0, 0.2, 0), function()
    distanceEnabled = not distanceEnabled
end)

local toggleHealth = createButton("Toggle Health Bar", UDim2.new(0.05, 0, 0.45, 0), function()
    healthEnabled = not healthEnabled
end)

local toggleName = createButton("Toggle Name ESP", UDim2.new(0.55, 0, 0.45, 0), function()
    nameEnabled = not nameEnabled
end)


local MadeByText = Instance.new("TextLabel")
MadeByText.Size = UDim2.new(1, 0, 0, 60)
MadeByText.Position = UDim2.new(0, 0, 0, 20)
MadeByText.BackgroundTransparency = 1
MadeByText.Text = "Made by Charlie Mitchell"
MadeByText.TextColor3 = Color3.fromRGB(255, 255, 255)
MadeByText.Font = Enum.Font.SourceSansBold
MadeByText.TextSize = 50
MadeByText.TextStrokeTransparency = 0
MadeByText.Visible = false
MadeByText.Parent = ScreenGui


local function showMadeByText()
    MadeByText.Visible = true
    MadeByText.TextTransparency = 0
    MadeByText.TextStrokeTransparency = 0
    
    local fadeTween = TweenService:Create(MadeByText, TweenInfo.new(3), {TextTransparency = 1, TextStrokeTransparency = 1})
    fadeTween:Play()
    
    task.wait(3)
    MadeByText.Visible = false
end


UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if input.KeyCode == Enum.KeyCode.Insert and not gameProcessed then
        uiVisible = not uiVisible
        MainFrame.Visible = uiVisible
        showMadeByText()
    end
end)


local function createESP()
    local box = Drawing.new("Square")
    box.Color = Color3.fromRGB(255, 255, 255)
    box.Thickness = 1
    box.Filled = false
    box.Transparency = 1
    box.Visible = false

    local nameText = Drawing.new("Text")
    nameText.Color = Color3.fromRGB(0, 255, 255)
    nameText.Size = 16
    nameText.Center = true
    nameText.Outline = true
    nameText.Visible = false

    local distanceText = Drawing.new("Text")
    distanceText.Color = Color3.fromRGB(255, 255, 255)
    distanceText.Size = 16
    distanceText.Center = true
    distanceText.Outline = true
    distanceText.Visible = false

    local healthBar = Drawing.new("Line")
    healthBar.Thickness = 2
    healthBar.Visible = false

    return { box = box, name = nameText, text = distanceText, health = healthBar }
end


local function updateESP()
    for player, esp in pairs(espObjects) do
        if player ~= LocalPlayer and player.Character then
            local char = player.Character
            local rootPart = char:FindFirstChildWhichIsA("BasePart")
            local head = char:FindFirstChild("Head") or rootPart
            local humanoid = char:FindFirstChildOfClass("Humanoid")

            if rootPart and head and humanoid then
                local box, nameText, text, healthBar = esp.box, esp.name, esp.text, esp.health

                local headPos, headOnScreen = Camera:WorldToViewportPoint(head.Position + Vector3.new(0, 0.5, 0))
                local footPos, footOnScreen = Camera:WorldToViewportPoint(rootPart.Position - Vector3.new(0, 3, 0))

                if headOnScreen and footOnScreen then
                    local distance = (Camera.CFrame.Position - rootPart.Position).Magnitude
                    local boxHeight = (footPos - headPos).Y
                    local boxWidth = boxHeight / 2.2

                    box.Position = Vector2.new(headPos.X - boxWidth / 2, headPos.Y)
                    box.Size = Vector2.new(boxWidth, boxHeight)
                    box.Visible = boxEnabled

                    nameText.Text = player.Name
                    nameText.Position = Vector2.new(headPos.X, headPos.Y - 35)
                    nameText.Visible = nameEnabled

                    text.Text = string.format("%.1f m", distance)
                    text.Position = Vector2.new(headPos.X, headPos.Y - 18)
                    text.Visible = distanceEnabled

                    local healthPercent = humanoid.Health / humanoid.MaxHealth
                    local barHeight = math.max(1, boxHeight * healthPercent)
                    local barX = box.Position.X - 6
                    local barY = box.Position.Y + (boxHeight - barHeight)

                    healthBar.From = Vector2.new(barX, box.Position.Y + boxHeight)
                    healthBar.To = Vector2.new(barX, barY)
                    healthBar.Color = Color3.fromRGB(255 * (1 - healthPercent), 255 * healthPercent, 50)
                    healthBar.Visible = healthEnabled
                else
                    box.Visible = false
                    nameText.Visible = false
                    text.Visible = false
                    healthBar.Visible = false
                end
            end
        end
    end
end


for _, player in pairs(Players:GetPlayers()) do
    if player ~= LocalPlayer then
        espObjects[player] = createESP()
    end
end

Players.PlayerAdded:Connect(function(player)
    espObjects[player] = createESP()
end)

Players.PlayerRemoving:Connect(removeESP)

RunService.RenderStepped:Connect(updateESP)
