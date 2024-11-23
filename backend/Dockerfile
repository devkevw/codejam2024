# Use an official lightweight Python image
FROM python:3.9-slim


# Copy requirements.txt first for efficient Docker caching
COPY ./requirements.txt /app/requirements.txt

# Copy source code to working directory
COPY ./app /app/app

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
