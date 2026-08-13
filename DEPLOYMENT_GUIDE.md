# DEPLOYMENT_GUIDE.md — Production Deployment Instructions

## Table of Contents
1. System Requirements
2. Environment Setup
3. Docker Deployment
4. Kubernetes Deployment
5. Cloud Platform Deployment
6. Monitoring & Maintenance
7. Security Configuration
8. Backup & Recovery
9. Performance Tuning
10. Troubleshooting

---

## 1. System Requirements

### Minimum Requirements

**CPU:** 2 cores  
**RAM:** 4GB  
**Storage:** 20GB  
**Network:** 1 Gbps recommended

### Recommended Requirements

**CPU:** 4+ cores  
**RAM:** 8GB+  
**Storage:** 50GB+ SSD  
**Network:** 10 Gbps for high-volume deployments

### Software Requirements

- **Docker:** 20.10+
- **Docker Compose:** 2.0+
- **Node.js:** 18+ or 20+
- **PostgreSQL:** 14+
- **Redis:** 6+

---

## 2. Environment Setup

### 2.1 Clone Repository

```bash
git clone https://github.com/endangered-species/advisor.git
cd advisor
```

### 2.2 Environment Variables

Create `.env` file:

```bash
# Application
NODE_ENV=production
PORT=3000
API_VERSION=1.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/endangered_species
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=20

# Cache
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600

# Security
JWT_SECRET=your-secret-key
ENCRYPTION_KEY=your-encryption-key
API_KEY_HEADER=X-API-Key

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Monitoring
ENABLE_METRICS=true
METRICS_PORT=9090

# Rate Limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=100
```

### 2.3 Database Initialization

```bash
# Create database
createdb endangered_species

# Run migrations
npm run migrate

# Seed data (optional)
npm run seed
```

---

## 3. Docker Deployment

### 3.1 Quick Start

```bash
# Build and start all services
docker-compose up -d

# Check service health
docker-compose ps
curl http://localhost:3000/api/v1/health
```

### 3.2 Production Configuration

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  api:
    image: endangered-species/advisor:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    restart: always
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4G
        reservations:
          cpus: '1.0'
          memory: 2G

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=endangered_species
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    command: redis-server --maxmemory 512mb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

### 3.3 Deploy

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 4. Kubernetes Deployment

### 4.1 Create Namespace

```bash
kubectl create namespace endangered-species
```

### 4.2 Create Secrets

```bash
kubectl create secret generic db-credentials \
  --from-literal=username=postgres \
  --from-literal=password=your-password \
  -n endangered-species

kubectl create secret generic api-secrets \
  --from-literal=jwt-secret=your-jwt-secret \
  --from-literal=encryption-key=your-encryption-key \
  -n endangered-species
```

### 4.3 Deploy Application

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: advisor-api
  namespace: endangered-species
spec:
  replicas: 3
  selector:
    matchLabels:
      app: advisor-api
  template:
    metadata:
      labels:
        app: advisor-api
    spec:
      containers:
      - name: advisor-api
        image: endangered-species/advisor:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /api/v1/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/v1/health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: advisor-api-service
  namespace: endangered-species
spec:
  selector:
    app: advisor-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

### 4.4 Apply Configuration

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

---

## 5. Cloud Platform Deployment

### 5.1 AWS Deployment

**Using ECS:**

```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name advisor-cluster

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-def.json

# Create service
aws ecs create-service \
  --cluster advisor-cluster \
  --service-name advisor-service \
  --task-definition advisor-task:1 \
  --desired-count 3
```

**Using EKS:**

```bash
# Create EKS cluster
eksctl create cluster \
  --name advisor-cluster \
  --region us-west-2 \
  --nodes 3

# Deploy using Kubernetes manifests
kubectl apply -f k8s/
```

### 5.2 Google Cloud Deployment

**Using Cloud Run:**

```bash
# Build and push image
gcloud builds submit --tag gcr.io/PROJECT_ID/advisor

# Deploy to Cloud Run
gcloud run deploy advisor \
  --image gcr.io/PROJECT_ID/advisor \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**Using GKE:**

```bash
# Create GKE cluster
gcloud container clusters create advisor-cluster \
  --num-nodes 3 \
  --region us-central1

# Deploy using Kubernetes manifests
kubectl apply -f k8s/
```

### 5.3 Azure Deployment

**Using Container Instances:**

```bash
# Create resource group
az group create --name advisor-rg --location eastus

# Create container instance
az container create \
  --resource-group advisor-rg \
  --name advisor-api \
  --image endangered-species/advisor:latest \
  --ports 3000
```

---

## 6. Monitoring & Maintenance

### 6.1 Health Checks

```bash
# Check API health
curl https://api.endangered-species-advisor.org/api/v1/health

# Expected response
{
  "status": "healthy",
  "timestamp": "2024-08-04T10:30:00Z",
  "services": {
    "api": "operational",
    "database": "operational",
    "cache": "operational"
  }
}
```

### 6.2 Metrics Collection

**Prometheus configuration included:**
- Request rate
- Response time
- Error rate
- Database connections
- Cache hit rate

Access metrics at `http://localhost:9090` (Grafana)

### 6.3 Logging

**Structured logs output:**
```json
{
  "timestamp": "2024-08-04T10:30:00Z",
  "level": "info",
  "message": "Assessment completed",
  "context": {
    "species": "Panthera pardus orientalis",
    "category": "CR",
    "duration": 1250
  }
}
```

### 6.4 Alerting

Configure alerts for:
- API error rate > 5%
- Response time > 1s (p95)
- Database connections > 80%
- Cache hit rate < 70%

---

## 7. Security Configuration

### 7.1 TLS/SSL

**Using Nginx:**

```nginx
server {
    listen 443 ssl http2;
    server_name api.endangered-species-advisor.org;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://api:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 7.2 API Authentication

**Bearer Token Authentication:**

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.endangered-species-advisor.org/v1/assess/iucn
```

### 7.3 Rate Limiting

Configure rate limits in `.env`:
```bash
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=100
```

---

## 8. Backup & Recovery

### 8.1 Database Backups

```bash
# Automated daily backups
0 2 * * * docker exec postgres pg_dump -U postgres endangered_species | gzip > /backup/$(date +\%Y\%m\%d).sql.gz

# Manual backup
docker exec postgres pg_dump -U postgres endangered_species > backup.sql
```

### 8.2 State Backups

State is automatically backed up every hour to `/data/backups/`

### 8.3 Recovery

```bash
# Restore database
docker exec -i postgres psql -U postgres endangered_species < backup.sql

# Restore state
cp /data/backups/snapshot_TIMESTAMP.json /data/state/
```

---

## 9. Performance Tuning

### 9.1 Database Optimization

```sql
-- Create indexes
CREATE INDEX idx_species_name ON species(name);
CREATE INDEX idx_assessments_species ON assessments(species_id);
CREATE INDEX idx_assessments_date ON assessments(assessed_date);

-- Configure connection pool
ALTER SYSTEM SET max_connections = 200;
```

### 9.2 Cache Optimization

```bash
# Increase Redis memory
redis-cli config set maxmemory 1gb

# Monitor cache hit rate
redis-cli info stats | keyspace_hits
```

### 9.3 Application Optimization

- Enable response compression
- Configure CDN for static assets
- Use connection pooling
- Implement request batching

---

## 10. Troubleshooting

### Common Issues

**Issue: Database connection failed**

**Solution:**
```bash
# Check database is running
docker-compose ps postgres

# Check logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

**Issue: High memory usage**

**Solution:**
```bash
# Check memory usage
docker stats

# Adjust container limits
docker-compose update --memory="4g" api
```

**Issue: Slow response times**

**Solution:**
```bash
# Check cache hit rate
redis-cli info stats

# Enable query logging
# Check for N+1 queries
# Add database indexes
```

---

## Support

**Documentation:** https://docs.endangered-species-advisor.org  
**Status Page:** https://status.endangered-species-advisor.org  
**Support:** support@endangered-species-advisor.org  
**GitHub Issues:** https://github.com/endangered-species/advisor/issues  

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-08-04
